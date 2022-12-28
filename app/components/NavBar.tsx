import { Link, NavLink, useLocation } from "@remix-run/react";
import {
  InformationCircleIcon,
  HomeModernIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { NavBarLink } from "./NavBarLink";
import type { User } from "@prisma/client";
import { ProfileLogout } from "./ProfileLogout";

type Props = {
  user: User | null;
};

export function NavBar({ user }: Props): JSX.Element {
  const location = useLocation();

  return (
    <nav className="fixed z-50 flex w-screen justify-end p-4 sm:fixed sm:left-0 sm:top-0 sm:bottom-0 sm:h-screen sm:w-56 sm:flex-col sm:justify-start sm:p-3">
      <NavLink
        to="/"
        className="mt-4 hidden text-center text-4xl font-extralight sm:block"
      >
        L&L
      </NavLink>
      <div className="fixed bottom-0 left-0 z-50 flex h-14 w-full justify-between overflow-hidden bg-white shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] sm:relative sm:inset-auto sm:mt-8 sm:mb-auto sm:flex sm:h-auto sm:flex-col sm:items-stretch sm:gap-2 sm:rounded-none sm:bg-transparent sm:shadow-none">
        <NavBarLink to="/informasjon">
          <InformationCircleIcon className="h-5 w-5" /> Informasjon
        </NavBarLink>
        <NavBarLink to="/overnatting">
          <HomeModernIcon className="h-5 w-5" />
          Overnatting
        </NavBarLink>
        <NavBarLink to="/programmet">
          <DocumentTextIcon className="h-5 w-5" /> Programmet
        </NavBarLink>
        <NavBarLink to="/su">
          <PencilSquareIcon className="h-5 w-5" />
          Svar utbedes
        </NavBarLink>
        {user?.role === "ADMIN" && (
          <NavBarLink to="/admin">
            <UsersIcon className="h-5 w-5" />
            Admin
          </NavBarLink>
        )}
      </div>
      <div>
        {user ? (
          <ProfileLogout user={user} />
        ) : (
          <Link
            to={{
              pathname: "/logg-inn",
              search: `redirectTo=${location.pathname}`,
            }}
            className="text-md inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-900 bg-sand-100 py-2 px-4 font-medium text-slate-900 shadow-sm hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logg inn
          </Link>
        )}
      </div>
    </nav>
  );
}
