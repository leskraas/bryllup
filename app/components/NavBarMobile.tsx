import type { User } from "@prisma/client";
import { NavBarLinkMobile } from "./NavBarLinkMobile";
import { routes } from "~/utils/routes";
import { ProfileLoginLogout } from "./ProfileLoginLogout";

type Props = {
  user: User | null;
};

export function NavBarMobile({ user }: Props): JSX.Element {
  return (
    <nav>
      <div className="h-16">
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-between bg-white shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)]">
          {routes(user?.role === "ADMIN").map((route) => (
            <NavBarLinkMobile key={route.to} to={route.to}>
              {route.children}
            </NavBarLinkMobile>
          ))}
        </div>
      </div>
      <div className="fixed top-2 right-2 z-50">
        <ProfileLoginLogout user={user} />
      </div>
    </nav>
  );
}
