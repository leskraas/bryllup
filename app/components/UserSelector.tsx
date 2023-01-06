import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import type { User } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import { ProfileImage } from "./ProfileImage";

type UserSelectorProps = {
  allUsers: Pick<User, "name" | "imgSrc">[];
  name: string;
  className?: string;
  selectedUser: Pick<User, "name" | "imgSrc"> | null;
  setSelectedUser: Dispatch<
    SetStateAction<Pick<User, "name" | "imgSrc"> | null>
  >;
};

export function UserSelector({
  allUsers,
  name,
  selectedUser,
  setSelectedUser,
  className,
}: UserSelectorProps): JSX.Element {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [query, setQuery] = useState("");
  const filteredPeople =
    query === ""
      ? allUsers
      : allUsers?.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const personPreview = query ? filteredPeople[0] : selectedUser;
  return (
    <div className={className}>
      <Combobox
        value={selectedUser}
        onChange={(user) => {
          setSelectedUser(user);
          setIsInputFocused(false);
        }}
      >
        {({ open }) => (
          <div className="relative mt-1">
            <Combobox.Label className="text-md block font-medium text-slate-900">
              Navn
            </Combobox.Label>
            <div className="relative">
              <Combobox.Input
                name={name}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-10 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                displayValue={(person?: User) => person?.name || ""}
                onChange={(event) => setQuery(event.target.value)}
              />
              {personPreview?.imgSrc && (
                <div className="absolute inset-y-0 left-0 flex items-center px-3">
                  <ProfileImage
                    imgSrc={personPreview.imgSrc}
                    name={personPreview.name}
                    className="h-5 w-5"
                  />
                </div>
              )}
            </div>
            <Transition
              as={React.Fragment}
              enter="transition ease-in duration-150 origin-top"
              enterFrom="opacity-0 scale-y-50"
              enterTo="opacity-100 scale-y-100"
              leave="transition ease-in duration-150 origin-top"
              leaveFrom="opacity-100 scale-y-100"
              leaveTo="opacity-0 scale-y-50"
              afterLeave={() => setQuery("")}
              show={open || (!open && !query && isInputFocused)}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Fant ingen.
                  </div>
                ) : (
                  filteredPeople.map((person, i) => (
                    <Combobox.Option
                      key={person.name}
                      onFocus={() => setIsInputFocused(true)}
                      className={({ active }) =>
                        `relative flex cursor-default select-none items-center gap-4 py-2 px-3 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <ProfileImage
                            imgSrc={person?.imgSrc || ""}
                            name={person.name}
                            className="h-6 w-6"
                          />
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span
                              className={`flex flex-1 items-center justify-end pl-3 ${
                                active ? "text-white" : "text-blue-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
}
