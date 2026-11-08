import { NextResponse } from "next/server";
import { addOrder, type Order, type OrderItem } from "@/lib/db";
import { getSku } from "@/lib/shop";
import { sendNotification } from "@/lib/email";
import { isEmail, isRecord, oneLine, readJson, text } from "@/lib/input";
import { ipFromHeaders, rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY = 20_000;
const PER_HOUR = 6;
const MAX_QTY = 10;
const PAYMENTS: Order["payment"][] = ["bank-transfer", "cash-on-delivery"];

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  if (rateLimited(`orders:${ipFromHeaders(request.headers)}`, PER_HOUR, 60 * 60 * 1000)) {
    return fail("You have sent several orders already. Please try again in an hour, or message us on WhatsApp.", 429);
  }

  const parsed = await readJson(request, MAX_BODY);
  if (!parsed.ok) {
    return fail(parsed.status === 413 ? "That order is too large." : "Invalid request.", parsed.status);
  }
  if (!isRecord(parsed.data)) return fail("Invalid request.", 400);
  const body = parsed.data;

  if (body.company) {
    return NextResponse.json({ ok: true, ref: "DV-000000", total: 0 });
  }

  // Price every line from the server catalog. Client prices are never trusted.
  // A line that is not valid stops the order, so a customer never gets an order
  // that is missing something they saw in their cart.
  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 30) : [];
  const quantities = new Map<string, number>();
  for (const raw of rawItems) {
    const sku = isRecord(raw) && typeof raw.sku === "string" ? raw.sku : "";
    const qty = isRecord(raw) ? Number(raw.qty) : NaN;
    if (!getSku(sku) || !Number.isInteger(qty) || qty < 1) {
      return fail("One of the items in your cart is not valid. Please refresh the page and try again.", 422);
    }
    quantities.set(sku, (quantities.get(sku) ?? 0) + qty);
  }

  const items: OrderItem[] = [];
  for (const [sku, qty] of quantities) {
    const item = getSku(sku);
    if (!item) continue;
    if (qty > MAX_QTY) {
      return fail(`You can order at most ${MAX_QTY} of the same item. Please change the quantity of ${item.name}.`, 422);
    }
    if (typeof item.lkr !== "number") {
      return fail(`${item.name} has no set price yet. Please ask us for a price instead.`, 409);
    }
    items.push({ slug: item.sku, name: `${item.name} (${item.sub})`, price: item.lkr, qty });
  }
  if (items.length === 0) {
    return fail("Your cart is empty.", 422);
  }

  const customer = {
    name: oneLine(body.name, 120),
    email: oneLine(body.email, 200),
    phone: oneLine(body.phone, 40),
    address: oneLine(body.address, 300),
    city: oneLine(body.city, 80),
  };
  if (
    customer.name.length < 2 ||
    !isEmail(customer.email) ||
    customer.phone.replace(/[^0-9]/g, "").length < 7 ||
    customer.address.length < 5 ||
    customer.city.length < 2
  ) {
    return fail("Please fill in your name, email, phone number and delivery address.", 422);
  }

  const payment = PAYMENTS.includes(body.payment as Order["payment"])
    ? (body.payment as Order["payment"])
    : "bank-transfer";
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  let order: Order;
  try {
    order = await addOrder({
      items,
      total,
      currency: "LKR",
      customer,
      payment,
      notes: text(body.notes, 1000),
    });
  } catch (err) {
    console.error("Failed to store order", err);
    return fail("We could not save your order. Please WhatsApp us instead.", 500);
  }

  // The order is already saved in the admin panel; a failed email is logged by sendNotification.
  const lines = items.map((i) => `${i.qty} x ${i.name} @ Rs ${i.price.toLocaleString("en-LK")}`).join("\n");
  await sendNotification({
    replyTo: customer.email,
    subject: `New drone order ${order.ref} from ${oneLine(customer.name, 60)} (Rs ${total.toLocaleString("en-LK")})`,
    text: [
      `Order: ${order.ref}`,
      lines,
      `Total: Rs ${total.toLocaleString("en-LK")}`,
      `Payment: ${payment}`,
      "",
      `Name: ${customer.name}`,
      `Email: ${customer.email}`,
      `Phone: ${customer.phone}`,
      `Address: ${customer.address}, ${customer.city}`,
      `Notes: ${order.notes}`,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true, ref: order.ref, total });
}
