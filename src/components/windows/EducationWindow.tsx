import GlassPanel from "../ui/GlassPanel";
import { courses, education, languages } from "../../data/profile";

export default function EducationWindow() {
  return (
    <div>
      <h2 className="text-[26px] font-semibold tracking-tight text-frost sm:text-[30px]">
        Education
      </h2>
      <p className="mt-1.5 text-[14px] text-ash">Learning path</p>

      <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
        <GlassPanel className="p-5">
          <div className="mono-label mb-3 text-[10px]">University</div>
          <h3 className="text-[15.5px] leading-snug font-medium text-frost">
            {education.university}
          </h3>
          <p className="mt-2 font-mono text-[11.5px] tracking-[0.08em] text-ash">
            {education.period}
          </p>
          <p className="mt-2.5 text-[13.5px] text-frost/80">{education.program}</p>
          <p className="mt-1.5 text-[12px] text-ash/70">{education.note}</p>
        </GlassPanel>

        <div className="grid gap-4">
          <GlassPanel className="p-5">
            <div className="mono-label mb-3 text-[10px]">Courses &amp; Certifications</div>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <div className="text-[13.5px] font-medium text-frost/90">{course.name}</div>
                  <div className="mt-0.5 text-[12px] text-ash">{course.detail}</div>
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel className="p-5">
            <div className="mono-label mb-3 text-[10px]">Languages</div>
            <ul className="space-y-2.5">
              {languages.map((lang) => (
                <li key={lang.name} className="flex items-baseline justify-between">
                  <span className="text-[13.5px] text-frost/90">{lang.name}</span>
                  <span className="font-mono text-[11px] tracking-[0.1em] text-diamond/80 uppercase">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
