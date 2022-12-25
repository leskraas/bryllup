import { Form, Link, NavLink, useLocation } from "@remix-run/react";
import {
  InformationCircleIcon,
  HomeModernIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  UsersIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { NavBarLink } from "./NavBarLink";
import { useMediaQuery } from "./hooks/useMediaQuery";
import type { User } from "@prisma/client";
import clsx from "clsx";
import { Fragment } from "react";

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
            <Menu as="div" className="relative inline-block text-left">
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Form action="/logg-ut" method="post">
                  <Menu.Items className="absolute left-0 bottom-0 z-10 mb-2 w-56 origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <input
                        type="hidden"
                        value={location.pathname}
                        name="redirectTo"
                      />
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-slate-900"
                                : "text-gray-700",
                              "flex w-full gap-2 px-4 py-2 text-left text-sm"
                            )}
                          >
                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                            Logg ut
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Form>
              </Transition>
              <Menu.Button className="flex items-center gap-3">
                <img
                  src={user?.imgSrc || ""}
                  alt={user.name}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <p>{user.name}</p>
              </Menu.Button>
            </Menu>
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
