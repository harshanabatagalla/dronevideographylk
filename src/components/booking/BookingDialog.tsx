"use client";

import { createContext, useCallback, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsappHref } from "@/lib/site";

/** Common questions a visitor can tick before we open WhatsApp, in groups. */
export const BOOKING_QUESTION_GROUPS: { title: string; questions: string[] }[] = [
  {
    title: "Price and booking",
    questions: [
      "How much does a drone video cost?",
      "What packages do you have?",
      "Do I need to pay a deposit?",
      "How do I pay?",
      "Can I change or cancel my booking?",
    ],
  },
  {
    title: "Your shoot",
    questions: [
      "Are you free on my dates?",
      "Can you film at my location?",
      "Can you film my wedding or event?",
      "How many hours will you film?",
      "What happens if it rains on the day?",
      "Do you get the drone permits for me?",
    ],
  },
  {
    title: "Your video",
    questions: [
      "How long until I get my video?",
      "Can I get the raw video files?",
      "Can you make short clips for Instagram or TikTok?",
      "Do you also take drone photos?",
    ],
  },
];

/** All questions in display order, used to order the message. */
export const BOOKING_QUESTIONS = BOOKING_QUESTION_GROUPS.flatMap((g) => g.questions);

const GREETING = "Hi! I would like to book a drone video.";

/** Builds the WhatsApp message from the ticked questions and the free text. */
export function buildBookingMessage(questions: string[], other: string): string {
  const lines = [GREETING];
  if (questions.length > 0) {
    lines.push("", "My questions:", ...questions.map((q, i) => `${i + 1}. ${q}`));
  }
  const extra = other.trim();
  if (extra) lines.push("", `Other question: ${extra}`);
  return lines.join("\n");
}

type BookingContextValue = { open: () => void };
const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * Site-wide "Book a drone video" flow: a button opens this dialog, the visitor
 * ticks common questions and/or writes their own, and submitting opens WhatsApp
 * with the message already typed.
 */
export function BookingProvider({ whatsapp, children }: { whatsapp: string; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [other, setOther] = useState("");

  const open = useCallback(() => dialogRef.current?.showModal(), []);
  const close = () => dialogRef.current?.close();

  function toggle(q: string) {
    setSelected((prev) => (prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Keep the ticked questions in the same order as the list.
    const ordered = BOOKING_QUESTIONS.filter((q) => selected.includes(q));
    const href = buildWhatsappHref(whatsapp, buildBookingMessage(ordered, other));
    const win = window.open(href, "_blank");
    if (win) win.opener = null;
    else window.location.href = href; // popup blocked: open in this tab instead
    close();
    setSelected([]);
    setOther("");
  }

  const count = selected.length;

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="booking-title"
        onClick={(e) => {
          // Clicking the dark area outside the box closes it.
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-3xl bg-white p-0 text-night shadow-2xl backdrop:bg-night/70 backdrop:backdrop-blur-sm"
      >
        <form onSubmit={onSubmit} className="flex max-h-[88vh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-night/10 px-6 pb-4 pt-6 sm:px-7">
            <div>
              <h2 id="booking-title" className="font-display text-2xl font-semibold">
                Book a drone video
              </h2>
              <p className="mt-1 text-sm text-night/60">
                Tick the questions you want to ask. We will open WhatsApp with your message ready to send.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-night/60 hover:bg-night/5 hover:text-night"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-5 sm:px-7">
            {BOOKING_QUESTION_GROUPS.map((group) => (
              <fieldset key={group.title} className="mt-5">
                <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-ocean">{group.title}</legend>
                <div className="space-y-2">
                  {group.questions.map((q) => {
                    const checked = selected.includes(q);
                    return (
                      <label
                        key={q}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition ${
                          checked ? "border-ocean bg-ocean/5" : "border-night/15 hover:border-night/30"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(q)}
                          className="h-4 w-4 shrink-0 accent-ocean"
                        />
                        {q}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <label className="mt-5 block text-sm">
              <span className="mb-1.5 block font-semibold">
                Other questions <span className="font-normal text-night/50">(optional)</span>
              </span>
              <textarea
                value={other}
                onChange={(e) => setOther(e.target.value)}
                rows={3}
                maxLength={600}
                placeholder="Type any other question here"
                className="w-full rounded-xl border border-night/15 px-4 py-3 focus:border-ocean focus:outline-none"
              />
            </label>
          </div>

          <div className="border-t border-night/10 px-6 pb-5 pt-4 sm:px-7">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-95"
            >
              <Icon name="whatsapp" size={18} />
              {count > 0 ? `Send ${count} question${count === 1 ? "" : "s"} on WhatsApp` : "Send on WhatsApp"}
            </button>
            <p className="mt-2 text-center text-xs text-night/50">
              Nothing is sent until you press send in WhatsApp.
            </p>
          </div>
        </form>
      </dialog>
    </BookingContext.Provider>
  );
}

/** A button that opens the booking dialog. Styled by the caller. */
export function BookButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("BookButton must be used inside BookingProvider");
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        ctx.open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
