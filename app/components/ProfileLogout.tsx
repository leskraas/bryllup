import { Menu, Transition } from "@headlessui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import type { User } from "@prisma/client";
import { Form, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { Fragment } from "react";

type LoginLogoutProps = {
  user: User;
};

export function ProfileLogout({ user }: LoginLogoutProps): JSX.Element {
  const location = useLocation();
  return (
    <Menu as="div" className="relative inline-block">
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
          <Menu.Items className="absolute right-0 z-10 mb-2 mt-2 w-44 origin-bottom-left translate-y-full rounded-md bg-white text-left shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-0 sm:bottom-0 sm:mt-0 sm:translate-y-0">
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
                      active ? "bg-gray-100 text-slate-900" : "text-gray-700",
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
      <Menu.Button className="flex items-center gap-3 text-left">
        <img
          src={user?.imgSrc || ""}
          alt={user.name}
          className={clsx(
            "h-10 w-10 rounded-full object-cover shadow-lg sm:h-7 sm:w-7 sm:shadow-none"
          )}
        />
        <p className="hidden sm:block">{user.name}</p>
      </Menu.Button>
    </Menu>
  );
}
