import type { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  ariaLabel?: string;
}

const styles = {
  primary:
    "border-diamond/35 bg-diamond/12 text-diamond hover:bg-diamond/18 hover:shadow-[0_0_28px_-6px_rgba(123,231,255,0.4)]",
  ghost: "border-white/12 bg-white/4 text-frost/85 hover:bg-white/8 hover:text-frost",
};

export default function Button({ variant = "primary", href, onClick, children, ariaLabel }: ButtonProps) {
  const className = `inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-5 font-mono text-[12.5px] font-medium tracking-[0.08em] transition-all duration-300 ${styles[variant]}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel} className={className}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} aria-label={ariaLabel} className={className}>
      {children}
    </button>
  );
}
