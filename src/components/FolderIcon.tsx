import { motion, type Variants } from "framer-motion";
import { ACCENT_HEX, type FolderDef } from "../data/profile";
import { EASE } from "../lib/motion";
import folderIcon from "../assets/folder.png";

interface FolderIconProps {
  folder: FolderDef;
  active: boolean;
  onOpen: () => void;
  variants?: Variants;
}

export default function FolderIcon({ folder, active, onOpen, variants }: FolderIconProps) {
  const accent = ACCENT_HEX[folder.accent];

  return (
    <motion.button
      variants={variants}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: EASE }}
      onClick={onOpen}
      aria-label={`Open ${folder.label} window — ${folder.meta}`}
      className="group flex min-h-[44px] flex-col items-center gap-2 rounded-2xl px-2 pt-3 pb-2"
    >
      <div className="relative">
        <div
          className="absolute -inset-4 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(closest-side, ${accent}1f, transparent)` }}
        />
        <img
          src={folderIcon}
          alt=""
          draggable={false}
          className="relative w-[58px] select-none drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
        />
      </div>
      <div className="text-center">
        <span
          className={`inline-block rounded-md px-2 py-0.5 font-mono text-[10.5px] font-medium tracking-[0.12em] transition-colors duration-300 ${
            active
              ? "bg-white/12 text-frost"
              : "text-frost/85 group-hover:bg-white/6 group-hover:text-frost"
          }`}
        >
          {folder.label}
        </span>
        <span className="mt-1 block font-mono text-[10px] tracking-[0.04em] text-ash/65">
          {folder.meta}
        </span>
      </div>
    </motion.button>
  );
}
