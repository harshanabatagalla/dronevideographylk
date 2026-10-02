import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { OFFICIAL, RULES_REVIEWED, RULES_REVIEWED_LABEL } from "@/lib/drone-rules";

/** Section of a guide: an anchored H2 and prose. */
export function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-2xl font-semibold text-night sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-night/75">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
            <Icon name="check" size={12} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-ocean hover:underline">
      {children}
    </a>
  );
}

export function Toc({ items }: { items: { id: string; title: string }[] }) {
  return (
    <nav aria-label="On this page" className="rounded-3xl border border-night/10 bg-white p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-night/65">On this page</h2>
      <ol className="mt-3 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className="text-night/75 hover:text-ocean">
              {it.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Freshness and "not legal advice" note shown near the top of every rules page. */
export function ReviewedNote() {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/65">
      <Icon name="clock" size={14} />
      <span>
        Last checked against official sources on{" "}
        <time dateTime={RULES_REVIEWED}>{RULES_REVIEWED_LABEL}</time>. Rules change, so always confirm with
        CAASL before you fly.
      </span>
    </p>
  );
}

export function OfficialSources() {
  const links = [
    { href: OFFICIAL.caaslDrones, label: "CAASL drones page", note: "rules, forms, insurance cover table" },
    { href: OFFICIAL.portal, label: "CAASL Drone Flight Approval Portal", note: "where you apply" },
    { href: OFFICIAL.zoneMap, label: "CAASL drone zone map", note: "restricted, airport and warning areas" },
    { href: OFFICIAL.standard, label: "Implementing Standard SLCAIS 053, Edition 02", note: "the full rules (PDF)" },
    { href: OFFICIAL.modDrone, label: "Ministry of Defence drone clearance page", note: "security clearance and documents" },
    { href: OFFICIAL.archaeology, label: "Department of Archaeology", note: "archaeological sites" },
    { href: OFFICIAL.wildlife, label: "Department of Wildlife Conservation", note: "national parks" },
    { href: OFFICIAL.forest, label: "Forest Department", note: "forest reserves" },
  ];
  return (
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.href}>
          <Ext href={l.href}>{l.label}</Ext> <span className="text-night/65">({l.note})</span>
        </li>
      ))}
    </ul>
  );
}
