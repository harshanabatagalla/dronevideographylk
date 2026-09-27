import { Section } from "@/components/ui/Section";
import { CartView } from "@/components/shop/CartView";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({ title: "Your Cart", path: "/shop/cart" }),
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <div className="bg-skyline pb-10 pt-32">
        <Section>
          <h1 className="font-display text-4xl font-semibold text-white">Your cart</h1>
          <p className="mt-2 text-white/65">Check your drones, then send the order. You pay after we confirm.</p>
        </Section>
      </div>
      <Section className="py-12">
        <CartView />
      </Section>
    </>
  );
}
