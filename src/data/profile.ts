import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  BarChart3,
  Cpu,
  CreditCard,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

export type WindowKey =
  | "about"
  | "impact"
  | "journey"
  | "experience"
  | "skills"
  | "education"
  | "downloads"
  | "contact";

export type Accent = "diamond" | "mint" | "iris" | "neutral";

export const ACCENT_HEX: Record<Accent, string> = {
  diamond: "#7BE7FF",
  mint: "#74F078",
  iris: "#8B7CFF",
  neutral: "#9BA3AF",
};

export const ACCENT_TEXT: Record<Accent, string> = {
  diamond: "text-diamond",
  mint: "text-mint",
  iris: "text-iris",
  neutral: "text-frost",
};

export const identity = {
  name: "Ivan Chmutov",
  role: "Middle Product Manager · iGaming B2C Platform",
  summary:
    "Product Manager with hands-on experience at a Malta-licensed B2C iGaming operator, focused on bonus systems, payments and deposit UX, KYC/AML product flows, retention and player journey optimization.",
  status: "Open to Product Manager / iGaming Product / Growth Product roles",
  location: "Remote / Cyprus / Serbia",
  focus: "Bonus systems · Deposit UX · KYC/AML · Retention · Player journey",
  telegram: "@olenmukava",
  telegramUrl: "https://t.me/olenmukava",
  email: "leeqesha66661@outlook.com",
};

export interface FolderDef {
  key: WindowKey;
  label: string;
  meta: string;
  accent: Accent;
}

export const folders: FolderDef[] = [
  { key: "about", label: "ABOUT_ME", meta: "identity file", accent: "diamond" },
  { key: "impact", label: "PRODUCT_IMPACT", meta: "metrics dashboard", accent: "mint" },
  { key: "journey", label: "PLAYER_JOURNEY", meta: "lifecycle map", accent: "diamond" },
  { key: "experience", label: "EXPERIENCE", meta: "mission log", accent: "diamond" },
  { key: "skills", label: "SKILLS", meta: "stack archive", accent: "iris" },
  { key: "education", label: "EDUCATION", meta: "learning path", accent: "neutral" },
  { key: "downloads", label: "DOWNLOADS", meta: "resume export", accent: "iris" },
  { key: "contact", label: "CONTACT", meta: "open channel", accent: "mint" },
];

export interface Metric {
  value: string;
  label: string;
  description: string;
  accent: Accent;
  icon: LucideIcon;
}

export const metrics: Metric[] = [
  {
    value: "+30%",
    label: "FTD Conversion",
    description:
      "Increased first-time-deposit conversion from acquisition traffic by approximately 30%.",
    accent: "diamond",
    icon: TrendingUp,
  },
  {
    value: "+10–15%",
    label: "NGR/GGR Uplift",
    description:
      "Contributed to average uplift in NGR/GGR through improved bonus mechanics and sharper promo targeting.",
    accent: "mint",
    icon: BarChart3,
  },
  {
    value: "Deployed",
    label: "Bonus Engine",
    description:
      "Designed and launched a new bonus engine with platform-wide and personalized bonus mechanics.",
    accent: "iris",
    icon: Cpu,
  },
  {
    value: "Optimized",
    label: "Deposit UX",
    description:
      "Owned end-to-end UX/UI for the bonus and deposit journey, reducing friction from deposit to first bonus claim.",
    accent: "diamond",
    icon: CreditCard,
  },
  {
    value: "Balanced",
    label: "KYC/AML Flows",
    description:
      "Managed compliance-sensitive product flows while keeping onboarding smooth for players.",
    accent: "neutral",
    icon: ShieldCheck,
  },
  {
    value: "Active Loop",
    label: "Retention & LTV",
    description:
      "Gathered player insights and translated them into prioritized roadmap items.",
    accent: "mint",
    icon: RefreshCcw,
  },
];

export const experience = {
  title: "Product Manager",
  company: "B2C iGaming Operator",
  tags: ["Malta-licensed", "Remote", "Multi-vertical platform"],
  period: "Nov 2024 — Mar 2026",
  description:
    "Owned product work across bonus systems, deposit UX, KYC/AML flows and retention mechanics for a multi-vertical B2C iGaming platform.",
  missions: [
    "Designed and launched a new bonus engine with platform-wide and personalized bonuses.",
    "Increased FTD conversion from acquisition traffic by approximately 30%.",
    "Contributed to 10–15% average uplift in NGR/GGR through better promo targeting.",
    "Owned end-to-end UX/UI for bonus and deposit journey.",
    "Reduced friction from deposit to first bonus claim.",
    "Managed KYC/AML product flows.",
    "Ran retention and LTV feedback loops.",
    "Translated player insights into roadmap priorities.",
  ],
};

export interface SkillItem {
  name: string;
  level?: string;
}

export interface SkillGroup {
  title: string;
  accent: Accent;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Product",
    accent: "diamond",
    items: [
      { name: "Bonus systems" },
      { name: "Promo mechanics" },
      { name: "Payments & deposit flows" },
      { name: "KYC/AML" },
      { name: "Retention & LTV" },
      { name: "Player journey" },
      { name: "UX/UI" },
      { name: "A/B testing" },
      { name: "Roadmap" },
      { name: "Prioritization" },
    ],
  },
  {
    title: "Analytics",
    accent: "mint",
    items: [
      { name: "Google Analytics", level: "advanced" },
      { name: "Tableau", level: "advanced" },
      { name: "SQL", level: "working" },
      { name: "Funnel analysis" },
      { name: "Player insights" },
      { name: "Product metrics" },
    ],
  },
  {
    title: "Tools",
    accent: "iris",
    items: [
      { name: "Jira", level: "advanced" },
      { name: "Figma", level: "advanced" },
      { name: "Notion" },
      { name: "GitHub" },
      { name: "Vercel" },
    ],
  },
  {
    title: "Domain",
    accent: "neutral",
    items: [
      { name: "B2C iGaming" },
      { name: "Multi-vertical platform" },
      { name: "Bonus lifecycle" },
      { name: "Deposit lifecycle" },
      { name: "Player onboarding" },
      { name: "Bonus abuse control" },
      { name: "CRM logic" },
      { name: "Segmentation" },
    ],
  },
];

export const education = {
  university: "Saint Petersburg Electrotechnical University “LETI”",
  period: "2023 — 2026",
  program: "Innovation Management / Innovatika",
  note: "Studies not completed",
};

export const courses = [
  { name: "ProductHowTo — Ivan Zamesin", detail: "Product Management" },
  { name: "Elements of AI", detail: "University of Helsinki" },
];

export const languages = [
  { name: "Russian", level: "Native" },
  { name: "English", level: "B2" },
  { name: "Chinese", level: "B1" },
];
