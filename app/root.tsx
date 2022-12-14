import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import remixImageStyles from "remix-image/remix-image.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import "dayjs/locale/nb";

dayjs.extend(duration);
dayjs.extend(isLeapYear);
dayjs.locale("nb");

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      as: "font",
      href: "/fonts/Parisienne-Regular.woff2",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap",
      rel: "stylesheet",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Sacramento:wght@400&display=swap",
      rel: "stylesheet",
    },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: remixImageStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Louise og Lars Erik",
  viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
});

export default function App() {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen w-screen overflow-x-hidden bg-sand-100 text-sand-900">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
