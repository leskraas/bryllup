import { NavLink } from "@remix-run/react";
import { NavBarLink } from "./NavBarLink";
import type { User } from "@prisma/client";
import { routes } from "~/utils/routes";
import { ProfileLoginLogout } from "./ProfileLoginLogout";

type Props = {
  user: User | null;
};

export function NavBar({ user }: Props): JSX.Element {
  return (
    <>
      <div className="w-56" />
      <nav className="fixed left-0 bottom-0 z-50 flex h-screen w-56 flex-col gap-4 px-2 py-4">
        <NavLink
          to="/"
          className="mt-4 hidden text-center text-4xl font-extralight sm:block"
        >
          L&L
        </NavLink>
        <div className="mb-auto flex-col items-stretch">
          {routes(user?.role === "ADMIN").map((route) => (
            <NavBarLink key={route.to} to={route.to}>
              {route.children}
            </NavBarLink>
          ))}
        </div>
        <ProfileLoginLogout user={user} />
      </nav>
    </>
  );
}
