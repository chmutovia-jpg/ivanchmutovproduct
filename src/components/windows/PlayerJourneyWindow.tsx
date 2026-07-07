import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import { journeyStages, type JourneyStage } from "../../data/journey";
import { ACCENT_HEX, ACCENT_TEXT } from "../../data/profile";
import { EASE } from "../../lib/motion";

const mapContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const nodeItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const connectorItem: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.3, ease: EASE } },
};

function MetricChips({ stage }: { stage: JourneyStage }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stage.metrics.map((metric) => (
        <span
          key={metric.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-2.5 py-1 text-[11.5px] text-frost/85"
        >
          {metric.dir === "up" ? (
            <ArrowUp size={11} strokeWidth={2.2} className="text-mint" />
          ) : (
            <ArrowDown size={11} strokeWidth={2.2} className="text-diamond" />
          )}
          {metric.label}
        </span>
      ))}
    </div>
  );
}

function StageDetail({ stage, showHeader = true }: { stage: JourneyStage; showHeader?: boolean }) {
  const accent = ACCENT_HEX[stage.accent];
  const Icon = stage.icon;

  return (
    <div className="space-y-5">
      {showHeader && (
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-2xl border"
              style={{
                borderColor: `${accent}45`,
                background: `${accent}12`,
                boxShadow: `0 0 24px -8px ${accent}80`,
              }}
            >
              <Icon size={18} strokeWidth={1.8} style={{ color: accent }} />
            </span>
            <div>
              <h3 className="font-mono text-[15px] font-semibold tracking-[0.1em] text-frost uppercase">
                {stage.name}
              </h3>
              <p className="mt-0.5 text-[12.5px] text-ash">{stage.context}</p>
            </div>
          </div>
          {stage.badge && (
            <span
              className="mt-1 shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9.5px] tracking-[0.12em] uppercase"
              style={{ borderColor: `${accent}40`, color: accent }}
            >
              {stage.badge}
            </span>
          )}
        </div>
      )}

      {/* narrative sections */}
      <div className={`space-y-4 ${showHeader ? "border-t border-white/8 pt-5" : ""}`}>
        {stage.sections.map((section) => (
          <div key={section.label}>
            <div className="mono-label mb-1.5 text-[9.5px]">{section.label}</div>
            {section.text && (
              <p className="text-[13.5px] leading-relaxed text-frost/85">{section.text}</p>
            )}
            {section.bullets && (
              <ul className={`space-y-1.5 ${section.text ? "mt-2" : ""}`}>
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-frost/85"
                  >
                    <span
                      className="mt-[7px] size-1 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* impact highlight */}
      {stage.impact && (
        <div
          className="rounded-xl border p-4"
          style={{ borderColor: `${accent}38`, background: `${accent}0d` }}
        >
          <div className="mono-label text-[9.5px]">Product impact · {stage.impact.label}</div>
          <div
            className={`mt-1.5 text-[26px] leading-none font-semibold tracking-tight ${ACCENT_TEXT[stage.accent]}`}
          >
            {stage.impact.value}
          </div>
        </div>
      )}

      {/* before → after mini-case */}
      {stage.beforeAfter && (
        <div className="overflow-hidden rounded-xl border border-white/8">
          <div className="mono-label border-b border-white/8 bg-white/3 px-4 py-2 text-[9.5px]">
            Case · Before → After
          </div>
          <div className="divide-y divide-white/6">
            <div className="flex items-baseline gap-3 px-4 py-2.5">
              <span className="w-[52px] shrink-0 font-mono text-[9.5px] tracking-[0.12em] text-ash/70 uppercase">
                Before
              </span>
              <span className="text-[13px] leading-relaxed text-ash">
                {stage.beforeAfter.before}
              </span>
            </div>
            <div className="flex items-baseline gap-3 px-4 py-2.5">
              <span className="w-[52px] shrink-0 font-mono text-[9.5px] tracking-[0.12em] text-mint/80 uppercase">
                After
              </span>
              <span className="text-[13px] leading-relaxed text-frost/90">
                {stage.beforeAfter.after}
              </span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5">
              <span className="w-[52px] shrink-0 font-mono text-[9.5px] tracking-[0.12em] text-ash/70 uppercase">
                Impact
              </span>
              <span
                className="inline-flex items-center gap-1.5 font-mono text-[12px] font-medium"
                style={{ color: accent }}
              >
                <ArrowRight size={12} strokeWidth={2.2} />
                {stage.beforeAfter.impact}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* metrics */}
      <div>
        <div className="mono-label mb-2.5 text-[9.5px]">Key metrics</div>
        <MetricChips stage={stage} />
      </div>
    </div>
  );
}

export default function PlayerJourneyWindow() {
  const [selectedId, setSelectedId] = useState(journeyStages[0].id);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const selected = journeyStages.find((s) => s.id === selectedId) ?? journeyStages[0];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[26px] font-semibold tracking-tight text-frost sm:text-[30px]">
            Player Journey Simulator
          </h2>
          <p className="mt-1.5 text-[14px] text-ash">B2C iGaming User Lifecycle</p>
        </div>
        <span className="mono-label pb-1 text-[10px]">8 stages · Full funnel</span>
      </div>
      <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-ash">
        Explore how product decisions influence player conversion, activation, retention and
        lifetime value. Select a stage to see the product thinking behind it.
      </p>

      <div className="mt-7 grid items-start gap-5 md:grid-cols-[272px_minmax(0,1fr)]">
        {/* journey map */}
        <motion.nav
          aria-label="Player journey stages"
          variants={prefersReducedMotion ? undefined : mapContainer}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "show"}
        >
          {journeyStages.map((stage, index) => {
            const accent = ACCENT_HEX[stage.accent];
            const isSelected = stage.id === selectedId;
            const Icon = stage.icon;
            return (
              <div key={stage.id}>
                {index > 0 && (
                  <motion.div
                    variants={connectorItem}
                    aria-hidden
                    className="ml-[29px] h-5 w-0.5 origin-top"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08))",
                    }}
                  />
                )}
                <motion.button
                  variants={nodeItem}
                  onClick={() => setSelectedId(stage.id)}
                  aria-label={`${stage.name} — ${stage.context}`}
                  aria-current={isSelected ? "step" : undefined}
                  className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors duration-300 ${
                    isSelected
                      ? "border-white/14 bg-white/6"
                      : "border-transparent hover:bg-white/4"
                  }`}
                >
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border transition-shadow duration-300"
                    style={{
                      borderColor: isSelected ? `${accent}70` : `${accent}35`,
                      background: `${accent}10`,
                      boxShadow: isSelected
                        ? `0 0 20px -4px ${accent}90`
                        : `0 0 12px -6px ${accent}50`,
                    }}
                  >
                    <Icon size={15} strokeWidth={1.8} style={{ color: accent }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-mono text-[11px] font-medium tracking-[0.1em] uppercase ${
                        isSelected ? "text-frost" : "text-frost/80 group-hover:text-frost"
                      }`}
                    >
                      {stage.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-ash/75">
                      {stage.context}
                    </span>
                  </span>
                  {stage.badge && (
                    <motion.span
                      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.07, duration: 0.4 }}
                      className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[8.5px] tracking-[0.1em] uppercase"
                      style={{ borderColor: `${accent}40`, color: accent }}
                    >
                      {stage.badge}
                    </motion.span>
                  )}
                </motion.button>

                {/* inline detail on mobile */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key={`inline-${stage.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden md:hidden"
                    >
                      <GlassPanel className="mt-2 mb-1 p-4">
                        <StageDetail stage={stage} showHeader={false} />
                      </GlassPanel>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.nav>

        {/* detail panel — desktop */}
        <div className="hidden md:sticky md:top-0 md:block">
          <GlassPanel className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <StageDetail stage={selected} />
              </motion.div>
            </AnimatePresence>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
