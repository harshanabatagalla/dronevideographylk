import type { ReactNode } from "react";
import { CompareTray } from "@/components/compare/CompareTray";
import { drones } from "@/lib/compare";

/** Every comparison page shares the compare tray, so drones picked on one page carry over. */
export default function CompareLayout({ children }: { children: ReactNode }) {
  const names = Object.fromEntries(drones.map((d) => [d.slug, d.short]));
  return (
    <>
      {children}
      <CompareTray names={names} />
    </>
  );
}
