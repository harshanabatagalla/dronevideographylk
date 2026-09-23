import { getOrders, type Order } from "@/lib/db";
import { setOrderStatusAction } from "@/app/admin/actions";
import { AdminHeading } from "@/components/admin/form";
import { formatLkr } from "@/lib/shop";
import { buildWhatsappHref } from "@/lib/site";

const STATUSES: Order["status"][] = ["new", "confirmed", "paid", "shipped", "cancelled"];

const STATUS_STYLES: Record<Order["status"], string> = {
  new: "bg-sunset/15 text-sunset",
  confirmed: "bg-ocean/15 text-ocean",
  paid: "bg-teal/15 text-teal",
  shipped: "bg-night/10 text-night/70",
  cancelled: "bg-coral/15 text-coral",
};

const PAYMENT_LABEL: Record<Order["payment"], string> = {
  "bank-transfer": "Bank transfer",
  "cash-on-delivery": "Cash on delivery",
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <AdminHeading title="Orders" description="Drone orders placed through the shop. Confirm each one with the customer before taking payment." />

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-night/20 bg-white p-10 text-center text-night/50">
          No orders yet. Orders from the shop will appear here.
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="rounded-2xl border border-night/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-night">
                    {o.ref} · {o.customer.name}
                    <span className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[o.status]}`}>
                      {o.status}
                    </span>
                  </p>
                  <p className="text-sm text-night/60">
                    <a href={`mailto:${o.customer.email}`} className="hover:text-ocean">
                      {o.customer.email}
                    </a>
                    {" · "}
                    {o.customer.phone}
                  </p>
                  <p className="text-sm text-night/60">
                    {o.customer.address}, {o.customer.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-semibold text-night">{formatLkr(o.total)}</p>
                  <p className="text-xs text-night/50">{PAYMENT_LABEL[o.payment]}</p>
                  <time className="text-xs text-night/40">{new Date(o.createdAt).toLocaleString()}</time>
                </div>
              </div>

              <ul className="mt-3 divide-y divide-night/5 rounded-xl bg-sand/60 px-3 text-sm text-night/75">
                {o.items.map((i) => (
                  <li key={i.slug} className="flex justify-between py-2">
                    <span>
                      {i.qty} x {i.name}
                    </span>
                    <span>{formatLkr(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>

              {o.notes && <p className="mt-3 text-sm text-night/70">Notes: {o.notes}</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                {STATUSES.filter((s) => s !== o.status).map((status) => (
                  <form key={status} action={setOrderStatusAction}>
                    <input type="hidden" name="id" value={o.id} />
                    <input type="hidden" name="status" value={status} />
                    <button
                      type="submit"
                      className="rounded-lg border border-night/15 px-3 py-1.5 text-xs font-medium text-night/70 transition hover:border-ocean/40"
                    >
                      Mark {status}
                    </button>
                  </form>
                ))}
                <a
                  href={buildWhatsappHref(o.customer.phone, `Hi ${o.customer.name}, thanks for your order ${o.ref} with dronevideography.lk.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${o.customer.email}?subject=${encodeURIComponent(`Your order ${o.ref}`)}`}
                  className="rounded-lg bg-sunset px-3 py-1.5 text-xs font-semibold text-night transition hover:bg-amber-400"
                >
                  Email
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
