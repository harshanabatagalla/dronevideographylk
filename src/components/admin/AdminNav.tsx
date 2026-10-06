"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";

// Paths below the admin address, which comes from the server (see src/lib/admin-path.ts).
const links: { path: string; label: string; icon: IconName }[] = [
  { path: "", label: "Overview", icon: "sparkles" },
  { path: "/analytics", label: "Analytics", icon: "signal" },
  { path: "/drones", label: "Drones", icon: "signal" },
  { path: "/footage", label: "Footage", icon: "camera" },
  { path: "/testimonials", label: "Testimonials", icon: "star" },
  { path: "/orders", label: "Orders", icon: "cart" },
  { path: "/enquiries", label: "Enquiries", icon: "whatsapp" },
  { path: "/settings", label: "Settings", icon: "shield" },
];

export function AdminNav({
  base,
  newEnquiries = 0,
  newOrders = 0,
}: {
  base: string;
  newEnquiries?: number;
  newOrders?: number;
}) {
  const pathname = usePathname();
  return (
    <nav className="px-3 pb-4" aria-label="Admin">
      <ul className="space-y-1">
        {links.map((link) => {
          const l = { ...link, href: `${base}${link.path}` };
          const active = link.path === "" ? pathname === base : pathname.startsWith(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  active ? "bg-sunset text-night" : "text-white/75 hover:bg-white/10"
                }`}
              >
                <Icon name={l.icon} size={18} />
                {l.label}
                {link.path === "/orders" && newOrders > 0 && (
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
                      active ? "bg-night text-sunset" : "bg-sunset text-night"
                    }`}
                  >
                    {newOrders}
                  </span>
                )}
                {link.path === "/enquiries" && newEnquiries > 0 && (
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
                      active ? "bg-night text-sunset" : "bg-sunset text-night"
                    }`}
                  >
                    {newEnquiries}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
