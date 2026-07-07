import GlassPanel from "../ui/GlassPanel";
import SkillChip from "../ui/SkillChip";
import { ACCENT_HEX, skillGroups } from "../../data/profile";

export default function SkillsWindow() {
  return (
    <div>
      <h2 className="text-[26px] font-semibold tracking-tight text-frost sm:text-[30px]">Skills</h2>
      <p className="mt-1.5 text-[14px] text-ash">System modules · Stack archive</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <GlassPanel key={group.title} className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <span
                className="size-1.5 rounded-full"
                style={{ background: ACCENT_HEX[group.accent] }}
              />
              <span className="mono-label text-[10.5px] text-frost/85">{group.title}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <SkillChip key={item.name} name={item.name} level={item.level} />
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
