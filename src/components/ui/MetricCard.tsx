import { ACCENT_TEXT, type Metric } from "../../data/profile";

export default function MetricCard({ value, label, description, accent, icon: Icon }: Metric) {
  return (
    <div className="glass-soft flex flex-col rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="mono-label text-[10px]">{label}</span>
        <Icon size={15} strokeWidth={1.8} className={`${ACCENT_TEXT[accent]} opacity-70`} />
      </div>
      <div
        className={`mt-4 text-[32px] leading-none font-semibold tracking-tight sm:text-[36px] ${ACCENT_TEXT[accent]}`}
      >
        {value}
      </div>
      <p className="mt-3 text-[13.5px] leading-relaxed text-ash">{description}</p>
    </div>
  );
}
