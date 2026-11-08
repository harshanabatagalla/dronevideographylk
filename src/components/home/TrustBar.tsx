const items = [
  "Licensed and insured pilots",
  "4K and 6K video",
  "Help with drone permits",
  "Book on WhatsApp from abroad",
];

/** Four plain facts under the hero, separated by hairlines. No icons, no badges. */
export function TrustBar() {
  return (
    <div className="border-b border-night/10 bg-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-3 px-5 py-6 sm:grid-cols-4 sm:gap-x-0 sm:px-8">
        {items.map((text) => (
          <li
            key={text}
            className="text-sm font-medium leading-snug text-night/80 sm:border-l sm:border-night/15 sm:px-6 sm:first:border-l-0 sm:first:pl-0"
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
