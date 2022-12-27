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
    <div>
      <NavBar user={user} />
      <div className="mb-24 flex min-h-screen pl-0 pt-4 sm:ml-48">
        <Outlet />
      </div>
    </div>
  );
}
