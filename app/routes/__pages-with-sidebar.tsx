import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { NavBar } from "~/components/NavBar";
import { getUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);

  return json({ user });
}

export default function Index(): JSX.Element {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div className="flex">
      <NavBar user={user} />
      <Outlet />
    </div>
  );
}
