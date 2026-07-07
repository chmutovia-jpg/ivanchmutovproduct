export default function SkillChip({ name, level }: { name: string; level?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[12.5px] text-frost/85">
      {name}
      {level && (
        <span className="border-l border-white/10 pl-1.5 font-mono text-[9.5px] tracking-[0.1em] text-diamond/75 uppercase">
          {level}
        </span>
      )}
    </span>
  );
}
