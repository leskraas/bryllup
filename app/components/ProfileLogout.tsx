import { Menu, Transition } from "@headlessui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import type { User } from "@prisma/client";
import { Form } from "@remix-run/react";
import clsx from "clsx";
import { Fragment } from "react";

type LoginLogoutProps = {
  user: User;
};

export function ProfileLogout({ user }: LoginLogoutProps): JSX.Element {
  return (
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
      <Menu.Button className="flex items-center gap-3">
        <img
          src={user?.imgSrc || ""}
          alt={user.name}
          className="h-7 w-7 rounded-full object-cover"
        />
        <p>{user.name}</p>
      </Menu.Button>
    </Menu>
  );
}
