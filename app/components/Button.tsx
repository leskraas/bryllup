import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  isIconButton?: boolean;
  showSuccessIcon?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  variant = "primary",
  isIconButton,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      type="submit"
      className={twMerge(
        "text-md inline-flex justify-center rounded-full border border-transparent bg-slate-900 py-2 px-4 font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        variant === "secondary" &&
          "border-2 border-slate-900 bg-inherit text-slate-900 hover:text-white",
        variant === "tertiary" &&
          "bg-transparent text-slate-900 shadow-none hover:bg-slate-100",
        variant === "danger" && " bg-red-600 text-white hover:bg-red-800",
        isIconButton && "p-2",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
