import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactFloat } from "@/components/layout/ContactFloat";
import { DroneHUD } from "@/components/experience/DroneHUD";
import { localBusinessJsonLd, JsonLd } from "@/lib/seo";
import { getSettings } from "@/lib/db";
import { CartProvider } from "@/components/shop/CartProvider";
import { BookingProvider } from "@/components/booking/BookingDialog";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <CartProvider>
      <BookingProvider whatsapp={settings.whatsapp}>
        <JsonLd data={localBusinessJsonLd()} />
        <DroneHUD />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <ContactFloat
          whatsapp={settings.whatsapp}
          whatsappMessage={settings.whatsappMessage}
          phone={settings.phone}
        />
      </BookingProvider>
    </CartProvider>
  );
}
