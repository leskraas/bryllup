import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import type { User } from "@prisma/client";

import React, { useRef, useState } from "react";

type UserSelectorProps = {
  allUsers: Pick<User, "name" | "imgSrc">[];
  name: string;
  className?: string;
};

export function UserSelector({
  allUsers,
  name,
  className,
}: UserSelectorProps): JSX.Element {
  const [selected, setSelected] = useState<Pick<User, "name" | "imgSrc">>();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? allUsers
      : allUsers?.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const personPreview = query ? filteredPeople[0] : selected;
  return (
    <div className={className}>
      <Combobox value={selected} onChange={setSelected}>
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
                  <img
                    src={personPreview.imgSrc}
                    alt={personPreview.name}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                </div>
              )}
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
              show={open || isInputFocused}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Fant ingen.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.name}
                      className={({ active }) =>
                        `relative flex cursor-default select-none gap-4 py-2 px-3 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <img
                            src={person?.imgSrc || ""}
                            alt={person.name}
                            className="h-5 w-5 rounded-full object-cover"
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
