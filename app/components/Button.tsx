import type { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      type="submit"
      className={classNames(
        "text-md inline-flex justify-center rounded-full border border-transparent bg-slate-900 py-2 px-4 font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
