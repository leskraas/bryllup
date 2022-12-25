import { Link, NavLink, useLocation } from "@remix-run/react";
import {
  InformationCircleIcon,
  HomeModernIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { NavBarLink } from "./NavBarLink";
import { useMediaQuery } from "./hooks/useMediaQuery";
import type { User } from "@prisma/client";
import { ProfileLogout } from "./ProfileLogout";

type Props = {
  user: User | null;
};

export function NavBar({ user }: Props): JSX.Element {
  const isSmall = useMediaQuery({ to: 640 });
  const location = useLocation();

  return (
    <nav className="flex h-screen flex-col items-center gap-8 py-8 pl-10 duration-300">
      <NavLink to="/" className="fixed text-4xl font-extralight sm:relative">
        L&L
      </NavLink>
      <div className="flex flex-1 flex-col justify-between">
        <motion.div
          initial={isSmall ? { y: "100%" } : {}}
          animate={isSmall ? { y: 0 } : {}}
          transition={{ ease: "linear" }}
          className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 rounded-t-md bg-sand-100 shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] duration-[inherit] sm:relative sm:flex-col sm:bg-transparent sm:p-2 sm:shadow-none"
        >
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
          <NavBarLink to="/rsvp">
            <PencilSquareIcon className="h-5 w-5" />
            RSVP
          </NavBarLink>
          {user?.role === "ADMIN" && (
            <NavBarLink to="/admin">
              <UsersIcon className="h-5 w-5" />
              Admin
            </NavBarLink>
          )}
        </motion.div>
        <div>
          {user ? (
            <ProfileLogout user={user} />
          ) : (
            <Link
              to={{
                pathname: "/logg-inn",
                search: `redirectTo=${location.pathname}`,
              }}
              className="flex gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-slate-100"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Logg inn
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
