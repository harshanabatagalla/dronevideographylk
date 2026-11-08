/** Date helpers for the shoot planner. Values are `YYYY-MM-DD` strings from <input type="date">. */

/**
 * "12 August 2026" for a date input value. The date is read as written. Passing
 * the string to new Date() treats it as midnight UTC, which shows the day before
 * for visitors west of UTC, such as everyone in the Americas.
 */
export function formatPlannerDate(value: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCMonth() !== month - 1) return null; // for example 31 February
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Today's date in the visitor's own time zone, as `YYYY-MM-DD`. toISOString() would give the UTC date. */
export function localDateInput(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}
