import { Check } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import { experience } from "../../data/profile";

export default function ExperienceWindow() {
  return (
    <div>
      <h2 className="text-[26px] font-semibold tracking-tight text-frost sm:text-[30px]">
        Experience
      </h2>
      <p className="mt-1.5 text-[14px] text-ash">Mission log · Operator file</p>

      <GlassPanel className="mt-6 p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div>
            <div className="mono-label text-[10px] text-diamond/80">Current mission</div>
            <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-frost sm:text-[23px]">
              {experience.title}
            </h3>
            <p className="mt-1 text-[14.5px] text-frost/75">{experience.company}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-ash">
            {experience.period}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-mint/20 bg-mint/6 px-3 py-1 font-mono text-[10.5px] tracking-[0.08em] text-mint/90 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-5 max-w-[680px] text-[15px] leading-[1.7] text-frost/80">
          {experience.description}
        </p>

        <div className="mt-6 border-t border-white/8 pt-5">
          <div className="mono-label mb-4 text-[10px]">Mission log</div>
          <ul className="space-y-3">
            {experience.missions.map((mission) => (
              <li key={mission} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border border-mint/30 bg-mint/8">
                  <Check size={11} strokeWidth={2.2} className="text-mint" />
                </span>
                <span className="text-[14px] leading-relaxed text-frost/85">{mission}</span>
              </li>
            ))}
          </ul>
        </div>
      </GlassPanel>
    </div>
  );
}
