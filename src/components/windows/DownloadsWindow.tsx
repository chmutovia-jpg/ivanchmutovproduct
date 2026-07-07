import { Download, FileText } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";

const files = [
  {
    name: "IVAN_CHMUTOV_CV.pdf",
    href: "/IVAN_CHMUTOV_CV.pdf",
    meta: "PDF · 90 KB · Print-ready",
    primary: true,
  },
  {
    name: "IVAN_CHMUTOV_CV.docx",
    href: "/IVAN_CHMUTOV_CV.docx",
    meta: "Word · 11 KB · ATS-friendly",
    primary: false,
  },
];

export default function DownloadsWindow() {
  return (
    <div>
      <h2 className="text-[24px] font-semibold tracking-tight text-frost sm:text-[28px]">
        Downloads
      </h2>
      <p className="mt-1.5 text-[14px] text-ash">Resume export · Latest version</p>

      <div className="mt-6 space-y-3">
        {files.map((file) => (
          <GlassPanel
            key={file.name}
            className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5 ${
              file.primary ? "border-diamond/20" : ""
            }`}
          >
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-xl border ${
                file.primary
                  ? "border-diamond/30 bg-diamond/8 text-diamond"
                  : "border-white/10 bg-white/4 text-frost/60"
              }`}
            >
              <FileText size={20} strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate font-mono text-[13px] font-medium tracking-[0.04em] text-frost">
                {file.name}
              </div>
              <div className="mt-1 font-mono text-[10.5px] tracking-[0.08em] text-ash/80 uppercase">
                {file.meta}
              </div>
            </div>
            <a
              href={file.href}
              download
              aria-label={`Download ${file.name}`}
              className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border px-5 font-mono text-[12px] font-medium tracking-[0.14em] transition-all duration-300 ${
                file.primary
                  ? "border-diamond/35 bg-diamond/12 text-diamond hover:bg-diamond/18 hover:shadow-[0_0_28px_-6px_rgba(123,231,255,0.4)]"
                  : "border-white/12 bg-white/4 text-frost/85 hover:bg-white/8 hover:text-frost"
              }`}
            >
              <Download size={14} strokeWidth={1.8} />
              DOWNLOAD
            </a>
          </GlassPanel>
        ))}
      </div>

      <p className="mt-5 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-ash/60">
        SAME PROFILE AS THIS SYSTEM — FORMATTED FOR HR REVIEW &amp; PRINT
      </p>
    </div>
  );
}
