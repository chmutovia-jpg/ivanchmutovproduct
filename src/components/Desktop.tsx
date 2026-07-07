import { useState, type ComponentType } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Background from "./Background";
import SystemBar from "./SystemBar";
import FolderIcon from "./FolderIcon";
import Window from "./Window";
import { ClockWidget, KeyImpactWidget, ProfileStatusWidget } from "./DesktopWidget";
import AboutWindow from "./windows/AboutWindow";
import ProductImpactWindow from "./windows/ProductImpactWindow";
import PlayerJourneyWindow from "./windows/PlayerJourneyWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import SkillsWindow from "./windows/SkillsWindow";
import EducationWindow from "./windows/EducationWindow";
import DownloadsWindow from "./windows/DownloadsWindow";
import ContactWindow from "./windows/ContactWindow";
import { folders, type WindowKey } from "../data/profile";
import { EASE } from "../lib/motion";

const WINDOWS: Record<
  WindowKey,
  { title: string; maxWidth: string; Content: ComponentType }
> = {
  about: { title: "ABOUT_ME", maxWidth: "max-w-[780px]", Content: AboutWindow },
  impact: { title: "PRODUCT_IMPACT", maxWidth: "max-w-[960px]", Content: ProductImpactWindow },
  journey: { title: "PLAYER_JOURNEY", maxWidth: "max-w-[980px]", Content: PlayerJourneyWindow },
  experience: { title: "EXPERIENCE", maxWidth: "max-w-[860px]", Content: ExperienceWindow },
  skills: { title: "SKILLS", maxWidth: "max-w-[900px]", Content: SkillsWindow },
  education: { title: "EDUCATION", maxWidth: "max-w-[820px]", Content: EducationWindow },
  downloads: { title: "DOWNLOADS", maxWidth: "max-w-[640px]", Content: DownloadsWindow },
  contact: { title: "CONTACT", maxWidth: "max-w-[700px]", Content: ContactWindow },
};

const folderGrid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } },
};

const folderItem: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};

const widgetGrid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.0 } },
};

const widgetItem: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};

export default function Desktop({ onReplay }: { onReplay: () => void }) {
  const [activeWindow, setActiveWindow] = useState<WindowKey | null>(null);

  const active = activeWindow ? WINDOWS[activeWindow] : null;

  return (
    <motion.div
      className="relative min-h-dvh"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: EASE } }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <Background />
      <SystemBar />

      <main className="relative z-10 mx-auto max-w-[1180px] px-5 pt-26 pb-28 sm:px-7 sm:pt-30">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
          className="mono-label mb-8 text-ash/55"
        >
          /// system ready — select a folder
        </motion.p>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_264px] lg:gap-14">
          <motion.section
            aria-label="Ivan OS folders"
            variants={folderGrid}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 content-start gap-x-2 gap-y-7 sm:grid-cols-3 sm:gap-y-9 xl:grid-cols-4"
          >
            {folders.map((folder) => (
              <FolderIcon
                key={folder.key}
                folder={folder}
                active={activeWindow === folder.key}
                variants={folderItem}
                onOpen={() =>
                  setActiveWindow((prev) => (prev === folder.key ? null : folder.key))
                }
              />
            ))}
          </motion.section>

          <motion.aside
            aria-label="Status widgets"
            variants={widgetGrid}
            initial="hidden"
            animate="show"
            className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1"
          >
            <ProfileStatusWidget variants={widgetItem} />
            <KeyImpactWidget variants={widgetItem} />
            <ClockWidget variants={widgetItem} />
          </motion.aside>
        </div>
      </main>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35, duration: 0.5 }}
        onClick={onReplay}
        aria-label="Replay access sequence"
        className="fixed bottom-4 left-4 z-30 inline-flex h-11 items-center gap-2 rounded-xl border border-white/8 bg-ink/70 px-3.5 font-mono text-[10.5px] tracking-[0.14em] text-ash/70 uppercase backdrop-blur-md transition-colors hover:bg-white/6 hover:text-frost sm:bottom-5 sm:left-5"
      >
        <RotateCcw size={12} />
        Replay Access Sequence
      </motion.button>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        aria-hidden
        className="fixed right-5 bottom-5 z-30 hidden font-mono text-[10px] tracking-[0.14em] text-white/20 sm:block"
      >
        IVAN OS · v2.6
      </motion.span>

      <AnimatePresence mode="wait">
        {active && activeWindow && (
          <Window
            key={activeWindow}
            title={active.title}
            maxWidth={active.maxWidth}
            onClose={() => setActiveWindow(null)}
          >
            <active.Content />
          </Window>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
