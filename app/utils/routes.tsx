import {
  InformationCircleIcon,
  HomeModernIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import type { ReactNode } from "react";

type Route = {
  to: string;
  children: ReactNode;
};

export const routes = (isAdmin: boolean): Route[] => [
  {
    to: "/informasjon",
    children: (
      <>
        <InformationCircleIcon className="h-5 w-5" /> Informasjon
      </>
    ),
  },
  {
    to: "/overnatting",
    children: (
      <>
        <HomeModernIcon className="h-5 w-5" /> Overnatting
      </>
    ),
  },
  {
    to: "/programmet",
    children: (
      <>
        <DocumentTextIcon className="h-5 w-5" /> Programmet
      </>
    ),
  },
  {
    to: "/su",
    children: (
      <>
        <PencilSquareIcon className="h-5 w-5" />
        Svar utbedes
      </>
    ),
  },
  ...(isAdmin
    ? [
        {
          to: "/admin",
          children: (
            <>
              <UsersIcon className="h-5 w-5" />
              Admin
            </>
          ),
        },
      ]
    : []),
];
