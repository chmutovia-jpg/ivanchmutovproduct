import MetricCard from "../ui/MetricCard";
import { metrics } from "../../data/profile";

export default function ProductImpactWindow() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[26px] font-semibold tracking-tight text-frost sm:text-[30px]">
            Product Impact
          </h2>
          <p className="mt-1.5 text-[14px] text-ash">
            Key outcomes from B2C iGaming product work.
          </p>
        </div>
        <span className="mono-label flex items-center gap-2 pb-1 text-[10px]">
          <span className="size-1.5 animate-pulse rounded-full bg-mint" />
          Live dashboard
        </span>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
    </div>
  );
}
