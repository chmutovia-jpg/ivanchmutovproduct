import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import { Gem, Star, Zap, Spade } from "lucide-react";
import Background from "./Background";
import { EASE } from "../lib/motion";

type Phase = "idle" | "spinning" | "granted" | "loading";

type SymbolId = "diamond" | "seven" | "bar" | "star" | "zap" | "spade";

const SEQUENCE: SymbolId[] = ["diamond", "seven", "bar", "star", "zap", "spade"];

const CELL = 84; // px, reel cell height
const WINDOW_H = 116; // px, visible reel window (neighbors peek)

const REELS = [
  { start: 0, cycles: 3, duration: 1.0, overshoot: false }, // stops ~1000ms
  { start: 1, cycles: 4, duration: 1.55, overshoot: false }, // stops ~1550ms
  { start: 2, cycles: 7, duration: 3.0, overshoot: true }, // stops ~3000ms, suspense
];

const BOOT_STEPS = [
  "Initializing profile",
  "Loading product impact",
  "Loading experience",
  "Loading system folders",
];

function SlotSymbol({ id }: { id: SymbolId }) {
  switch (id) {
    case "diamond":
      return (
        <Gem
          size={34}
          strokeWidth={1.6}
          className="text-diamond drop-shadow-[0_0_14px_rgba(123,231,255,0.45)]"
        />
      );
    case "seven":
      return <span className="font-mono text-[30px] font-semibold text-iris">7</span>;
    case "bar":
      return (
        <span className="rounded-md border border-white/20 px-1.5 py-0.5 font-mono text-[12px] font-semibold tracking-[0.18em] text-frost/80">
          BAR
        </span>
      );
    case "star":
      return <Star size={30} strokeWidth={1.6} className="text-frost/65" />;
    case "zap":
      return <Zap size={30} strokeWidth={1.6} className="text-mint/75" />;
    case "spade":
      return <Spade size={30} strokeWidth={1.6} className="text-frost/55" />;
  }
}

interface ReelProps {
  index: number;
  config: (typeof REELS)[number];
  phase: Phase;
  locked: boolean;
  onLock: (index: number) => void;
  reduced: boolean;
}

function Reel({ index, config, phase, locked, onLock, reduced }: ReelProps) {
  const spinning = phase !== "idle";

  const { strip, finalY } = useMemo(() => {
    const rotated = [...SEQUENCE.slice(config.start), ...SEQUENCE.slice(0, config.start)];
    const items: SymbolId[] = [];
    for (let i = 0; i < config.cycles; i++) items.push(...rotated);
    const diamondPos = rotated.indexOf("diamond");
    items.push(...rotated.slice(0, diamondPos + 1));
    return { strip: items, finalY: -(items.length - 1) * CELL };
  }, [config]);

  // Cell glow: locked → steady diamond edge; granted → single celebratory pulse
  const celebrating = phase === "granted" || phase === "loading";
  const cellAnimate = celebrating
    ? {
        borderColor: "rgba(123,231,255,0.55)",
        boxShadow: [
          "0 0 26px -8px rgba(123,231,255,0.3)",
          "0 0 52px -4px rgba(123,231,255,0.6)",
          "0 0 30px -8px rgba(123,231,255,0.38)",
        ],
      }
    : locked
      ? {
          borderColor: "rgba(123,231,255,0.4)",
          boxShadow: "0 0 26px -8px rgba(123,231,255,0.3)",
        }
      : {
          borderColor: "rgba(255,255,255,0.12)",
          boxShadow: "0 0 0px 0px rgba(123,231,255,0)",
        };

  // Reduced motion: no spin, fade the diamond in sequentially
  useEffect(() => {
    if (reduced && spinning && !locked) {
      const t = setTimeout(() => onLock(index), 250 + index * 300);
      return () => clearTimeout(t);
    }
  }, [reduced, spinning, locked, index, onLock]);

  let stripAnimate: TargetAndTransition = { y: 0 };
  let stripTransition: Transition = { duration: 0 };

  if (spinning && !reduced) {
    if (config.overshoot) {
      // decelerate to a near-miss, push through, overshoot, settle back
      stripAnimate = {
        y: [0, finalY + CELL * 0.92, finalY - CELL * 0.3, finalY],
        filter: ["blur(0px)", "blur(5px)", "blur(0px)", "blur(0px)"],
      };
      stripTransition = {
        y: {
          duration: config.duration,
          times: [0, 0.74, 0.91, 1],
          ease: [
            [0.3, 0.3, 0.35, 1],
            [0.55, 0.05, 0.5, 0.95],
            EASE,
          ],
        },
        filter: {
          duration: config.duration,
          times: [0, 0.12, 0.62, 1],
          ease: "linear",
        },
      };
    } else {
      // tiny mechanical settle at the end
      stripAnimate = {
        y: [0, finalY - CELL * 0.12, finalY],
        filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
      };
      stripTransition = {
        y: {
          duration: config.duration,
          times: [0, 0.9, 1],
          ease: [
            [0.28, 0.4, 0.3, 1],
            EASE,
          ],
        },
        filter: {
          duration: config.duration,
          times: [0, 0.15, 0.75],
          ease: "linear",
        },
      };
    }
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border bg-black/40"
      style={{ width: CELL, height: WINDOW_H }}
      animate={cellAnimate}
      transition={
        celebrating
          ? { duration: 0.9, ease: "easeInOut" }
          : { duration: 0.3, ease: "easeOut" }
      }
    >
      {/* inner shading + edge fades */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0) 30%, rgba(5,5,5,0) 70%, rgba(5,5,5,0.92) 100%)",
        }}
      />
      {reduced && spinning ? (
        <motion.div
          className="flex items-center justify-center"
          style={{ height: WINDOW_H }}
          initial={{ opacity: 0 }}
          animate={{ opacity: locked ? 1 : 0.2 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <SlotSymbol id={locked ? "diamond" : SEQUENCE[config.start]} />
        </motion.div>
      ) : (
        <motion.div
          style={{ paddingTop: (WINDOW_H - CELL) / 2 }}
          animate={stripAnimate}
          transition={stripTransition}
          onAnimationComplete={() => {
            if (spinning && !locked) onLock(index);
          }}
        >
          {strip.map((id, i) => (
            <div key={i} className="flex items-center justify-center" style={{ height: CELL }}>
              <SlotSymbol id={id} />
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

function BootScreen() {
  const progress = useMotionValue(0);
  const width = useTransform(progress, (v) => `${v}%`);
  const label = useTransform(progress, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const controls = animate(progress, 100, { duration: 1.75, ease: EASE });
    return () => controls.stop();
  }, [progress]);

  return (
    <motion.div
      key="boot"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="flex w-full flex-col justify-center"
    >
      <div className="mono-label text-diamond">Access granted</div>
      <div className="mt-1.5 font-mono text-lg font-semibold tracking-[0.08em] text-frost">
        LOADING IVAN OS...
      </div>

      <ul className="mt-6 space-y-2.5 font-mono text-[12px] text-ash">
        {BOOT_STEPS.map((step, i) => (
          <motion.li
            key={step}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.32, duration: 0.3, ease: EASE }}
            className="flex items-center justify-between gap-6"
          >
            <span>▸ {step}</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.32 + 0.24, duration: 0.2 }}
              className="text-mint"
            >
              OK
            </motion.span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between font-mono text-[10.5px] tracking-[0.12em] text-ash">
          <span>SYSTEM BOOT</span>
          <motion.span>{label}</motion.span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full"
            style={{
              width,
              background: "linear-gradient(90deg, rgba(123,231,255,0.75), rgba(116,240,120,0.75))",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function SlotGate({ onUnlock }: { onUnlock: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [locked, setLocked] = useState<boolean[]>([false, false, false]);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const handleLock = (index: number) => {
    setLocked((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  useEffect(() => {
    if (phase === "spinning" && locked.every(Boolean)) setPhase("granted");
  }, [phase, locked]);

  useEffect(() => {
    if (phase === "granted") {
      const t = setTimeout(() => setPhase("loading"), 1000);
      return () => clearTimeout(t);
    }
    if (phase === "loading") {
      const t = setTimeout(onUnlock, 2100);
      return () => clearTimeout(t);
    }
  }, [phase, onUnlock]);

  const spin = () => {
    if (phase !== "idle") return;
    setPhase("spinning");
  };

  const statusText =
    phase === "idle"
      ? "SECURITY CHECK REQUIRED"
      : phase === "spinning"
        ? "VERIFYING CREDENTIALS…"
        : "ACCESS GRANTED";

  const caption =
    phase === "loading"
      ? "Preparing desktop environment"
      : phase === "granted"
        ? "Identity confirmed"
        : "Three diamonds required to unlock Ivan OS";

  return (
    <motion.div
      className="relative flex min-h-dvh items-center justify-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <Background />

      {/* subtle in-gate flash when the third diamond locks */}
      <AnimatePresence>
        {phase === "granted" && !prefersReducedMotion && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-40 bg-diamond"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.16, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.3, 1], ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <motion.section
        aria-label="Profile access system"
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="glass relative z-10 w-full max-w-[440px] rounded-3xl px-6 py-7 backdrop-blur-xl sm:px-8 sm:py-8"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mono-label flex items-center gap-2 text-frost/90">
              <span className="inline-block size-1.5 rounded-full bg-diamond" />
              Profile access system
            </div>
            <p className="mt-1.5 text-[13px] text-ash">iGaming Product Manager Database</p>
          </div>
          <span
            className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] tracking-[0.14em] uppercase transition-colors duration-500 ${
              phase === "granted" || phase === "loading"
                ? "border-mint/35 text-mint"
                : "border-white/12 text-ash"
            }`}
          >
            <span
              className={`size-1 rounded-full ${
                phase === "granted" || phase === "loading" ? "bg-mint" : "bg-ash/70"
              }`}
            />
            {phase === "granted" || phase === "loading" ? "Unlocked" : "Secured"}
          </span>
        </div>

        <div className="mt-6 border-t border-white/8" />

        {/* content zone: slot ⇄ boot */}
        <div className="mt-6 flex min-h-[300px] flex-col">
          <AnimatePresence mode="wait">
            {phase === "loading" ? (
              <BootScreen key="boot" />
            ) : (
              <motion.div
                key="slot"
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col items-center"
              >
                <div className="flex justify-center gap-2.5">
                  {REELS.map((config, i) => (
                    <Reel
                      key={i}
                      index={i}
                      config={config}
                      phase={phase}
                      locked={locked[i]}
                      onLock={handleLock}
                      reduced={prefersReducedMotion}
                    />
                  ))}
                </div>

                {/* lock indicators */}
                <div className="mt-4 flex gap-2" aria-hidden>
                  {locked.map((isLocked, i) => (
                    <span
                      key={i}
                      className={`size-1.5 rounded-full transition-all duration-300 ${
                        isLocked ? "bg-diamond shadow-[0_0_8px_rgba(123,231,255,0.7)]" : "bg-white/15"
                      }`}
                    />
                  ))}
                </div>

                <div
                  role="status"
                  className={`mt-5 font-mono text-[11.5px] tracking-[0.2em] transition-colors duration-500 ${
                    phase === "granted"
                      ? "text-diamond [text-shadow:0_0_18px_rgba(123,231,255,0.55)]"
                      : "text-ash"
                  }`}
                >
                  {statusText}
                </div>

                <button
                  onClick={spin}
                  disabled={phase !== "idle"}
                  aria-label="Spin to unlock Ivan OS"
                  className={`mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border font-mono text-[12.5px] font-medium tracking-[0.18em] transition-all duration-300 ${
                    phase === "idle"
                      ? "border-diamond/40 bg-diamond/10 text-diamond hover:bg-diamond/16 hover:shadow-[0_0_32px_-8px_rgba(123,231,255,0.5)]"
                      : "cursor-default border-white/10 bg-white/4 text-ash/70"
                  }`}
                >
                  <Gem size={15} strokeWidth={1.8} />
                  {phase === "idle" ? "SPIN TO UNLOCK" : "VERIFYING…"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center font-mono text-[10.5px] tracking-[0.06em] text-ash/70">
          {caption}
        </p>
      </motion.section>
    </motion.div>
  );
}
