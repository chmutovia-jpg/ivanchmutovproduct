import type { LucideIcon } from "lucide-react";
import {
  UserPlus,
  ShieldCheck,
  Gem,
  Gift,
  Gamepad2,
  RefreshCcw,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import type { Accent } from "./profile";

export interface JourneySection {
  label: string;
  text?: string;
  bullets?: string[];
}

export interface JourneyStage {
  id: string;
  name: string;
  context: string;
  badge?: string;
  accent: Accent;
  icon: LucideIcon;
  sections: JourneySection[];
  impact?: { label: string; value: string };
  beforeAfter?: { before: string; after: string; impact: string };
  metrics: { label: string; dir: "up" | "down" }[];
}

export const journeyStages: JourneyStage[] = [
  {
    id: "register",
    name: "Register",
    context: "First contact with the product",
    accent: "mint",
    icon: UserPlus,
    sections: [
      {
        label: "User goal",
        text: "Create an account quickly and understand the value proposition.",
      },
      {
        label: "Product problem",
        text: "High registration friction decreases conversion from acquisition traffic.",
      },
      {
        label: "Challenge",
        text: "Users don't trust unknown platforms. Too many steps increase abandonment.",
      },
      {
        label: "Product solution",
        bullets: [
          "Simplify registration flow",
          "Reduce unnecessary fields",
          "Improve onboarding clarity",
          "Highlight value proposition earlier",
        ],
      },
    ],
    metrics: [
      { label: "Registration conversion", dir: "up" },
      { label: "Drop-off rate", dir: "down" },
      { label: "Acquisition efficiency", dir: "up" },
    ],
  },
  {
    id: "kyc",
    name: "KYC Verification",
    context: "Compliance vs UX balance",
    accent: "neutral",
    icon: ShieldCheck,
    sections: [
      {
        label: "User goal",
        text: "Verify identity and access full product functionality.",
      },
      {
        label: "Product problem",
        text: "Mandatory verification creates friction before first value.",
      },
      {
        label: "Challenge",
        text: "Compliance requirements can negatively affect onboarding.",
      },
      {
        label: "Product solution",
        bullets: [
          "Reduce unnecessary steps",
          "Explain why verification is needed",
          "Improve document upload UX",
          "Provide clear status feedback",
        ],
      },
    ],
    metrics: [
      { label: "KYC completion rate", dir: "up" },
      { label: "Verification abandonment", dir: "down" },
      { label: "Activated users", dir: "up" },
    ],
  },
  {
    id: "first-deposit",
    name: "First Deposit",
    context: "The most important conversion point",
    badge: "FTD +30%",
    accent: "diamond",
    icon: Gem,
    sections: [
      {
        label: "User goal",
        text: "Make the first deposit quickly and confidently.",
      },
      {
        label: "Product problem",
        text: "Deposit friction directly impacts FTD conversion.",
      },
      {
        label: "Challenge",
        text: "Users hesitate because of:",
        bullets: [
          "Unclear payment flow",
          "Lack of trust signals",
          "Too many steps",
          "Payment failures",
        ],
      },
      {
        label: "Product solution",
        bullets: [
          "Optimize deposit UX",
          "Reduce number of steps",
          "Improve payment visibility",
          "Add trust signals",
          "Personalize deposit experience",
        ],
      },
    ],
    impact: { label: "FTD Conversion", value: "+30%" },
    beforeAfter: {
      before: "5 steps, high friction, weak trust signals",
      after: "3 steps, clearer flow, visible payment status",
      impact: "FTD conversion +30%",
    },
    metrics: [
      { label: "FTD conversion", dir: "up" },
      { label: "Payment success rate", dir: "up" },
      { label: "Deposit abandonment", dir: "down" },
    ],
  },
  {
    id: "bonus-claim",
    name: "Bonus Claim",
    context: "First value moment after deposit",
    badge: "BONUS ENGINE",
    accent: "iris",
    icon: Gift,
    sections: [
      {
        label: "User goal",
        text: "Understand the available bonus and activate it easily.",
      },
      {
        label: "Product problem",
        text: "Bonus mechanics can confuse users and create low engagement.",
      },
      {
        label: "Challenge",
        text: "Users don't understand:",
        bullets: ["Eligibility", "Requirements", "Wagering conditions", "Expiration"],
      },
      {
        label: "Product solution",
        bullets: [
          "Clear bonus presentation",
          "Personalized offers",
          "Better promo UX",
          "Transparent conditions",
        ],
      },
    ],
    impact: { label: "Bonus Engine", value: "Deployed" },
    beforeAfter: {
      before: "One-size-fits-all bonuses with unclear conditions",
      after: "Personalized offers with transparent wagering terms",
      impact: "NGR/GGR +10–15%",
    },
    metrics: [
      { label: "Bonus activation rate", dir: "up" },
      { label: "Player engagement", dir: "up" },
      { label: "NGR/GGR", dir: "up" },
    ],
  },
  {
    id: "first-experience",
    name: "First Experience",
    context: "Did the player actually get value?",
    accent: "neutral",
    icon: Gamepad2,
    sections: [
      {
        label: "User goal",
        text: "Experience product value after the first interaction.",
      },
      {
        label: "Product problem",
        text: "Many users deposit once but never become active players.",
      },
      {
        label: "Challenge",
        text: "The first session determines future behavior.",
      },
      {
        label: "Product solution",
        bullets: [
          "Improve first session flow",
          "Reduce confusion",
          "Personalize experience",
          "Connect user with relevant products",
        ],
      },
    ],
    metrics: [
      { label: "Activation rate", dir: "up" },
      { label: "First session completion", dir: "up" },
      { label: "Early retention", dir: "up" },
    ],
  },
  {
    id: "retention-loop",
    name: "Retention Loop",
    context: "Meaningful reasons to come back",
    badge: "LTV ↑",
    accent: "mint",
    icon: RefreshCcw,
    sections: [
      {
        label: "User goal",
        text: "Have reasons to return regularly.",
      },
      {
        label: "Product problem",
        text: "Acquiring new users is expensive. Long-term value comes from retention.",
      },
      {
        label: "Challenge",
        text: "Need to create meaningful return triggers.",
      },
      {
        label: "Product solution",
        bullets: [
          "Segmentation",
          "Personalized promotions",
          "CRM triggers",
          "Behavioral analysis",
          "Lifecycle campaigns",
        ],
      },
    ],
    beforeAfter: {
      before: "Generic broadcast promos for the whole base",
      after: "Segmented lifecycle campaigns driven by player behavior",
      impact: "Retention & LTV uplift",
    },
    metrics: [
      { label: "Retention", dir: "up" },
      { label: "LTV", dir: "up" },
      { label: "Churn", dir: "down" },
    ],
  },
  {
    id: "redeposit",
    name: "Redeposit",
    context: "Second cycle of trust",
    accent: "diamond",
    icon: CreditCard,
    sections: [
      {
        label: "User goal",
        text: "Continue using the product easily.",
      },
      {
        label: "Product problem",
        text: "Users may leave after the first deposit cycle.",
      },
      {
        label: "Challenge",
        text: "Need to identify:",
        bullets: ["Timing", "Motivation", "Friction"],
      },
      {
        label: "Product solution",
        bullets: [
          "Analyze player behavior",
          "Improve payment experience",
          "Personalize offers",
          "Build lifecycle journeys",
        ],
      },
    ],
    metrics: [
      { label: "Redeposit rate", dir: "up" },
      { label: "LTV", dir: "up" },
      { label: "NGR", dir: "up" },
    ],
  },
  {
    id: "ltv-growth",
    name: "LTV Growth",
    context: "From single deposits to long-term value",
    accent: "mint",
    icon: TrendingUp,
    sections: [
      {
        label: "Product goal",
        text: "Turn short-term users into valuable long-term players.",
      },
      {
        label: "Product approach",
        text: "Combine:",
        bullets: [
          "Product experience",
          "Retention mechanics",
          "Personalization",
          "Analytics",
          "CRM",
        ],
      },
    ],
    metrics: [
      { label: "Lifetime Value", dir: "up" },
      { label: "Revenue efficiency", dir: "up" },
      { label: "Sustainable growth", dir: "up" },
    ],
  },
];
