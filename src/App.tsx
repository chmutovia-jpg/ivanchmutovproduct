import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SlotGate from "./components/SlotGate";
import Desktop from "./components/Desktop";
import { ACCESS_STORAGE_KEY } from "./lib/motion";

function readAccess(): boolean {
  try {
    return localStorage.getItem(ACCESS_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export default function App() {
  const [accessGranted, setAccessGranted] = useState(readAccess);
  const [flash, setFlash] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const unlock = () => {
    try {
      localStorage.setItem(ACCESS_STORAGE_KEY, "true");
    } catch {
      /* private mode — session-only access */
    }
    if (!prefersReducedMotion) setFlash(true);
    setAccessGranted(true);
  };

  const replay = () => {
    try {
      localStorage.removeItem(ACCESS_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setAccessGranted(false);
  };

  return (
    <div className="min-h-dvh bg-ink text-frost">
      <AnimatePresence mode="wait">
        {accessGranted ? (
          <Desktop key="desktop" onReplay={replay} />
        ) : (
          <SlotGate key="gate" onUnlock={unlock} />
        )}
      </AnimatePresence>

      {/* Diamond flash covering the gate → desktop swap */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[100]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(234,252,255,0.95), rgba(123,231,255,0.55) 55%, rgba(7,9,13,0) 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.55, times: [0, 0.25, 1], ease: "easeOut" }}
            onAnimationComplete={() => setFlash(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
