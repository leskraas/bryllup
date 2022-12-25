import { NavLink } from "@remix-run/react";
import type { RemixNavLinkProps } from "@remix-run/react/dist/components";
import clsx from "clsx";
import type { ReactNode } from "react";

type NavBarLinkProps = {
  children: ReactNode;
} & RemixNavLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

export function NavBarLink({
  children,
  ...navProps
}: NavBarLinkProps): JSX.Element {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(
          "inline-flex flex-1 flex-col items-center gap-2 rounded-t-lg p-2 text-xs transition-opacity  duration-300  hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:min-w-[20ch] sm:flex-row sm:rounded-lg sm:text-base",
          {
            "bg-slate-900 text-white opacity-100 shadow-sm": isActive,
            "opacity-70": !isActive,
          }
        )
      }
      {...navProps}
    >
      {children}
    </NavLink>
  );
}
