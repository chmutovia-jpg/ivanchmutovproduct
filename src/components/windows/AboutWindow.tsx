import { Mail, Send } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import { identity } from "../../data/profile";

const rows = [
  { label: "Role", value: "Middle Product Manager" },
  { label: "Domain", value: "B2C iGaming Platform" },
  { label: "Focus", value: identity.focus },
  { label: "Status", value: identity.status },
  { label: "Location", value: identity.location },
];

export default function AboutWindow() {
  return (
    <div className="space-y-7">
      <div className="flex items-center gap-5">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-diamond/25 bg-diamond/8 font-mono text-[17px] font-semibold tracking-wide text-diamond">
          IC
        </div>
        <div>
          <h2 className="text-[24px] font-semibold tracking-tight text-frost sm:text-[28px]">
            {identity.name}
          </h2>
          <p className="mt-1 font-mono text-[12px] tracking-[0.06em] text-diamond/90">
            {identity.role}
          </p>
        </div>
      </div>

      <p className="max-w-[680px] text-[15.5px] leading-[1.7] text-frost/80">{identity.summary}</p>

      <GlassPanel className="divide-y divide-white/6">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[96px_1fr] gap-4 px-5 py-3.5 sm:grid-cols-[130px_1fr]"
          >
            <span className="mono-label pt-0.5 text-[10px]">{row.label}</span>
            <span className="text-[13.5px] leading-relaxed text-frost/90">{row.value}</span>
          </div>
        ))}
      </GlassPanel>

      <div className="flex flex-wrap gap-3">
        <a
          href={identity.telegramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Telegram chat with Ivan"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-diamond/30 bg-diamond/8 px-4 text-[13px] text-diamond transition-colors hover:bg-diamond/14"
        >
          <Send size={14} strokeWidth={1.8} />
          Telegram {identity.telegram}
        </a>
        <a
          href={`mailto:${identity.email}`}
          aria-label="Send email to Ivan"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/4 px-4 text-[13px] text-frost/85 transition-colors hover:bg-white/8 hover:text-frost"
        >
          <Mail size={14} strokeWidth={1.8} />
          {identity.email}
        </a>
      </div>
    </div>
  );
}
