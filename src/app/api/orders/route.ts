import { NextResponse } from "next/server";
import { addOrder, type Order, type OrderItem } from "@/lib/db";
import { getSku } from "@/lib/shop";
import { sendNotification } from "@/lib/email";

export const runtime = "nodejs";

type OrderPayload = {
  items?: { sku?: unknown; qty?: unknown }[];
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  payment?: string;
  notes?: string;
  /** honeypot, must stay empty */
  company?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const PAYMENTS: Order["payment"][] = ["bank-transfer", "cash-on-delivery"];

export async function POST(request: Request) {
  let body: OrderPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true, ref: "DV-000000", total: 0 });
  }

  // Price every line from the server catalog. Client prices are never trusted.
  const items: OrderItem[] = [];
  for (const raw of Array.isArray(body.items) ? body.items.slice(0, 30) : []) {
    const item = typeof raw.sku === "string" ? getSku(raw.sku) : undefined;
    const qty = Number(raw.qty);
    if (!item || !Number.isInteger(qty) || qty < 1 || qty > 10) continue;
    if (typeof item.lkr !== "number") {
      return NextResponse.json(
        { ok: false, error: `${item.name} has no set price yet. Please ask us for a price instead.` },
        { status: 409 },
      );
    }
    items.push({ slug: item.sku, name: `${item.name} (${item.sub})`, price: item.lkr, qty });
  }
  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: "Your cart is empty." }, { status: 422 });
  }

  const customer = {
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 40),
    address: clip(body.address, 300),
    city: clip(body.city, 80),
  };
  if (
    customer.name.length < 2 ||
    !isEmail(customer.email) ||
    customer.phone.replace(/[^0-9]/g, "").length < 7 ||
    customer.address.length < 5 ||
    customer.city.length < 2
  ) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, email, phone number and delivery address." },
      { status: 422 },
    );
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
      notes: clip(body.notes, 1000),
    });
  } catch (err) {
    console.error("Failed to store order", err);
    return NextResponse.json(
      { ok: false, error: "We could not save your order. Please WhatsApp us instead." },
      { status: 500 },
    );
  }

  // The order is already saved in the admin panel; a failed email is logged by sendNotification.
  const lines = items.map((i) => `${i.qty} x ${i.name} @ Rs ${i.price.toLocaleString("en-LK")}`).join("\n");
  await sendNotification({
    replyTo: customer.email,
    subject: `New drone order ${order.ref} from ${customer.name} (Rs ${total.toLocaleString("en-LK")})`,
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
