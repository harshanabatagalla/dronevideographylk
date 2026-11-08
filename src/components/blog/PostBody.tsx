import Image from "next/image";
import { getPhoto, type Block } from "@/lib/blog";
import { photoAlt } from "@/lib/alt";
import { Inline } from "./Inline";

/** Turns a post's blocks into markup. One place decides how every kind of block looks. */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-lg leading-relaxed text-night/80">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={b.id}
                className="mt-14 scroll-mt-28 font-display text-3xl font-medium text-night first:mt-0 sm:text-[2rem]"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-9 font-display text-xl font-semibold text-night">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-5">
                <Inline text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 list-disc space-y-3 pl-6 marker:text-night/40">
                {b.items.map((item) => (
                  <li key={item} className="pl-1">
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-night">
                {b.items.map((item) => (
                  <li key={item} className="pl-1">
                    <Inline text={item} />
                  </li>
                ))}
              </ol>
            );
          case "photo": {
            const photo = getPhoto(b.id);
            if (!photo) return null;
            return (
              <figure key={i} className="my-9">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-night/5">
                  <Image
                    src={photo.poster}
                    alt={photoAlt(photo.title, photo.location)}
                    fill
                    quality={60}
                    sizes="(max-width: 1024px) 92vw, 720px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 text-sm leading-snug text-night/70">{b.caption}</figcaption>
              </figure>
            );
          }
          case "note":
            return (
              <aside key={i} className="mt-7 rounded-2xl bg-sand/70 p-5 text-base leading-relaxed text-night/80 sm:p-6">
                <p className="font-semibold text-night">{b.title}</p>
                <p className="mt-1.5">
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="mt-7 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left text-base">
                  <caption className="pb-3 text-left text-sm text-night/70">{b.caption}</caption>
                  <thead>
                    <tr className="border-y-2 border-night">
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="py-2.5 pr-4 font-semibold text-night">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-night/15 border-b border-night/15">
                    {b.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={cell} scope="row" className="py-3 pr-4 font-semibold text-night">
                              {cell}
                            </th>
                          ) : (
                            <td key={cell} className="py-3 pr-4">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
