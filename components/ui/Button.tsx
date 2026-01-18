"use client";

import { Link } from "@/i18n/navigation";
import { cloneElement, isValidElement, type ReactElement } from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "white" | "black";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap border-2 bg-[linear-gradient(90deg,transparent_0%,transparent_50%,var(--color-sandy-brown-500)_50%,var(--color-sandy-brown-500)_100%)] bg-[length:200%_100%] bg-[position:0%_0%] transition-[background-position,color,border-color] duration-300 hover:border-sandy-brown-500 hover:bg-[position:100%_0%] hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sandy-brown-500 disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  white: "border-parchment-50 text-parchment-50",
  black: "border-carbon-black-950 text-carbon-black-950",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  asChild?: boolean;
};

export function Button({
  size = "md",
  variant = "white",
  className,
  asChild,
  children,
  ...props
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(" ");

  if (asChild && children && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      ...props,
      className: [child.props.className, classes].filter(Boolean).join(" "),
    });
  }

  return (
    <button className={classes} type={props.type ?? "button"} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  locale?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  locale,
  size = "md",
  variant = "white",
  className,
  children,
}: ButtonLinkProps) {
  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(" ");
  return (
    <Link href={href} locale={locale} className={classes}>
      {children}
    </Link>
  );
}
