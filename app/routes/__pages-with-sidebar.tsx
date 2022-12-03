import { Outlet } from "@remix-run/react";
import { NavBar } from "~/components/NavBar";

export default function Index(): JSX.Element {
  return (
    <div className="flex">
      <NavBar />
      <Outlet />
    </div>
  );
}
