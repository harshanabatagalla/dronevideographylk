import { Icon } from "@/components/ui/Icon";

const items = [
  { icon: "shield", text: "Licensed & insured pilots" },
  { icon: "camera", text: "4K / 6K cinema footage" },
  { icon: "check", text: "Permits handled for you" },
  { icon: "whatsapp", text: "Book in minutes on WhatsApp" },
] as const;

export function TrustBar() {
  return (
    <div className="border-b border-night/10 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-5 gap-y-4 px-5 py-7 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3 sm:px-8">
        {items.map((i) => (
          <div
            key={i.text}
            className="flex items-center gap-2.5 text-[0.8rem] font-medium leading-tight text-night/75 sm:text-sm"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-ocean/15 to-teal/15 text-ocean">
              <Icon name={i.icon} size={16} />
            </span>
            {i.text}
          </div>
        ))}
      </div>
    </div>
  );
}
