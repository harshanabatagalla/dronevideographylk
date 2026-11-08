import Link from "next/link";
import { Fragment } from "react";

const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
const LINK =
  "font-semibold text-ocean underline decoration-ocean/30 underline-offset-4 transition-colors duration-150 hover:decoration-ocean";

/**
 * Renders post text with the two kinds of markup the blog allows: [text](link) and **bold**.
 * Links that start with a slash are internal. Everything else opens in a new tab.
 * Nothing is ever passed to innerHTML.
 */
export function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={LINK}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
              {label}
            </a>
          );
        }
        const bold = /^\*\*([^*]+)\*\*$/.exec(part);
        if (bold) {
          return (
            <strong key={i} className="font-semibold text-night">
              {bold[1]}
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
