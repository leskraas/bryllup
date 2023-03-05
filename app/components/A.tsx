import type { AnchorHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type AProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function A({ className, children, ...atr }: AProps): JSX.Element {
  return (
    <a
      {...atr}
      className={twMerge(
        "font-medium italic underline hover:text-sand-800",
        className
      )}
    >
      {children}
    </a>
  );
}
