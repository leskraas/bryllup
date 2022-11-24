import { NavLink } from "@remix-run/react";

export function NavBar(): JSX.Element {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <NavLink to="/informasjon">Informasjon</NavLink>
      <NavLink to="/bryllupsdagen">Bryllupsdagen</NavLink>
      <NavLink to="/rsvp">RSVP</NavLink>
    </nav>
  );
}
