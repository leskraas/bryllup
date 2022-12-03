import { NavLink } from "@remix-run/react";
import classNames from "classnames";
import {
  InformationCircleIcon,
  HomeModernIcon,
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export function NavBar(): JSX.Element {
  const activeStyle = (isActive: boolean) =>
    classNames(
      "rounded-lg p-2 opacity-70 sm:min-w-[20ch] duration-[inherit] hover:opacity-100 inline-flex gap-2 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      {
        "text-white shadow-sm opacity-100 bg-slate-900": isActive,
      }
    );
  return (
    <nav className="flex flex-col items-center gap-8 py-8 pl-10 duration-300">
      <NavLink to="/" className="text-4xl font-extralight">
        L&L
      </NavLink>
      <div className="flex flex-col gap-2 duration-[inherit]">
        <NavLink
          className={({ isActive }) => classNames(activeStyle(isActive))}
          to="/informasjon"
        >
          <InformationCircleIcon className="h-5 w-5" /> Informasjon
        </NavLink>
        <NavLink
          className={({ isActive }) => classNames(activeStyle(isActive))}
          to="/overnatting"
        >
          <HomeModernIcon className="h-5 w-5" />
          Overnatting
        </NavLink>
        <NavLink
          className={({ isActive }) => classNames(activeStyle(isActive))}
          to="/programmet"
        >
          <DocumentTextIcon className="h-5 w-5" /> Programmet
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames(activeStyle(isActive), "ring-0")
          }
          to="/rsvp"
        >
          <PencilSquareIcon className="h-5 w-5" />
          RSVP
        </NavLink>
      </div>
    </nav>
  );
}
