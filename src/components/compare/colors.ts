/**
 * Colours for the two sides of a comparison, for SVG drawings. They match the
 * theme in globals.css: drone A is ocean, drone B is amber. "Ink" versions are
 * dark enough for text on white and cream; the light versions are for dark bands.
 */
export const TONE = {
  a: { ink: "#0e7490", light: "#22b8cf", fill: "#0e7490" },
  b: { ink: "#b45309", light: "#f59e0b", fill: "#f59e0b" },
  night: "#0b1f2a",
} as const;

export type Side = "a" | "b";
