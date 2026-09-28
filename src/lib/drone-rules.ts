/**
 * Single source for the Sri Lanka drone rule pages.
 *
 * Every rule on those pages was checked against these official sources on the
 * date below. When CAASL or the Ministry of Defence change anything, update the
 * pages, then update RULES_REVIEWED. Never bump the date without re-checking.
 *
 * Main source: SLCAIS 053 Edition 02 (issued 01 March 2025, all parts in force
 * by 01 September 2025), plus the CAASL drones page and the Ministry of Defence
 * drone clearance page.
 */
export const RULES_REVIEWED = "2026-09-28";
export const RULES_REVIEWED_LABEL = "28 September 2026";
export const RULES_PUBLISHED = "2026-09-28";

export const OFFICIAL = {
  caaslDrones: "https://www.caa.lk/en/drones",
  portal: "https://portal.caa.lk/drone/",
  zoneMap: "https://portal.caa.lk/drone/map.html",
  standard: "https://www.caa.lk/images/stories/pdf/implementing_standards/sn053.pdf",
  standardUpdate: "https://www.caa.lk/en/drones?id=559",
  modDrone: "https://www.defence.lk/Applications/drone",
  archaeology: "https://archaeology.gov.lk/",
  forest: "http://forestdept.gov.lk/",
  wildlife: "https://www.dwc.gov.lk/",
  meteo: "https://www.meteo.gov.lk/",
} as const;

export const RULES_PATH = "/sri-lanka-drone-rules";
export const PERMIT_PATH = "/sri-lanka-drone-rules/how-to-get-a-drone-permit";
