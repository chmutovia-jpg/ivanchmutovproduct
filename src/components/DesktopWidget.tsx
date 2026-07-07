import { useEffect, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { Activity, Clock3, TrendingUp } from "lucide-react";
import { EASE } from "../lib/motion";

function WidgetShell({
  title,
  icon,
  children,
  variants,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} className="glass rounded-[20px] p-4 backdrop-blur-xl">
      <div className="mono-label mb-3 flex items-center justify-between text-[10px] text-ash/80">
        {title}
        {icon}
      </div>
      {children}
    </motion.div>
  );
}

export function ProfileStatusWidget({ variants }: { variants?: Variants }) {
  return (
    <WidgetShell title="Profile status" icon={<Activity size={12} />} variants={variants}>
      <div className="flex items-center gap-2 text-[14px] font-medium text-frost">
        <span className="size-1.5 animate-pulse rounded-full bg-mint" />
        Available
      </div>
      <div className="mt-2.5 space-y-1 font-mono text-[11px] tracking-[0.08em] text-ash">
        <div>MIDDLE PM</div>
        <div>iGAMING B2C</div>
      </div>
    </WidgetShell>
  );
}

function ImpactRow({
  label,
  value,
  color,
  fill,
}: {
  label: string;
  value: string;
  color: string;
  fill: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.08em]">
        <span className="text-ash">{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, opacity: 0.75 }}
          initial={{ width: 0 }}
          animate={{ width: fill }}
          transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
        />
      </div>
    </div>
  );
}

export function KeyImpactWidget({ variants }: { variants?: Variants }) {
  return (
    <WidgetShell title="Key impact" icon={<TrendingUp size={12} />} variants={variants}>
      <div className="space-y-3.5">
        <ImpactRow label="FTD CONV" value="+30%" color="#7BE7FF" fill="78%" />
        <ImpactRow label="NGR/GGR" value="+10–15%" color="#74F078" fill="52%" />
      </div>
    </WidgetShell>
  );
}

export function ClockWidget({ variants }: { variants?: Variants }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <WidgetShell title="System clock" icon={<Clock3 size={12} />} variants={variants}>
      <div className="font-mono text-[26px] leading-none font-medium tracking-tight text-frost">
        {time}
      </div>
      <div className="mt-1.5 font-mono text-[10.5px] tracking-[0.08em] text-ash/80 uppercase">
        {date}
      </div>
      <div className="mt-3 space-y-1 border-t border-white/8 pt-3 font-mono text-[11px] tracking-[0.08em] text-ash">
        <div>REMOTE · CYPRUS / SERBIA</div>
        <div>ENGLISH B2</div>
      </div>
    </WidgetShell>
  );
}
