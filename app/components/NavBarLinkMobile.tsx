import { NavLink } from "@remix-run/react";
import type { RemixNavLinkProps } from "@remix-run/react/dist/components";
import clsx from "clsx";
import type { ReactNode } from "react";

type NavBarLinkProps = {
  children: ReactNode;
} & RemixNavLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

export function NavBarLinkMobile({
  children,
  ...navProps
}: NavBarLinkProps): JSX.Element {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(
          "m-auto inline-flex h-full flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ",
          {
            "border-t-2 border-t-slate-900 opacity-100 shadow-sm": isActive,
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
