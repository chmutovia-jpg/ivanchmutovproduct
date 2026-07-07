import { useEffect, useState } from "react";
import { Check, Copy, Globe, Mail, Send } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import Button from "../ui/Button";
import { identity } from "../../data/profile";

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-frost/70">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="mono-label text-[9.5px]">{label}</div>
        <div className="mt-0.5 truncate text-[14px] text-frost/90">{value}</div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-white/3"
      >
        {inner}
      </a>
    );
  }
  return <div className="flex items-center gap-4 px-5 py-3.5">{inner}</div>;
}

export default function ContactWindow() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
    } catch {
      // fallback for browsers where the async clipboard API is unavailable
      const area = document.createElement("textarea");
      area.value = identity.email;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } catch {
        /* clipboard fully unavailable — mailto link still works */
      }
      area.remove();
    }
  };

  return (
    <div>
      <div className="mono-label flex items-center gap-2 text-[10px] text-mint">
        <span className="size-1.5 animate-pulse rounded-full bg-mint" />
        Channel open
      </div>

      <h2 className="mt-3 max-w-[560px] text-[24px] leading-tight font-semibold tracking-tight text-frost sm:text-[29px]">
        Let’s build products that players actually return to.
      </h2>
      <p className="mt-3 max-w-[520px] text-[14.5px] leading-relaxed text-ash">
        Open to Product Manager, iGaming Product and Growth Product opportunities.
      </p>

      <GlassPanel className="mt-7 divide-y divide-white/6">
        <ContactRow
          icon={<Send size={15} strokeWidth={1.8} />}
          label="Telegram"
          value={identity.telegram}
          href={identity.telegramUrl}
        />
        <ContactRow
          icon={<Mail size={15} strokeWidth={1.8} />}
          label="Email"
          value={identity.email}
          href={`mailto:${identity.email}`}
        />
        <ContactRow
          icon={<Globe size={15} strokeWidth={1.8} />}
          label="Availability"
          value={identity.location}
        />
      </GlassPanel>

      <div className="mt-7 flex flex-wrap gap-3">
        <Button href={identity.telegramUrl} ariaLabel="Contact Ivan in Telegram">
          <Send size={14} strokeWidth={1.8} />
          Contact in Telegram
        </Button>
        <Button variant="ghost" onClick={copyEmail} ariaLabel="Copy email address">
          {copied ? (
            <>
              <Check size={14} strokeWidth={1.8} className="text-mint" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} strokeWidth={1.8} />
              Copy Email
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
