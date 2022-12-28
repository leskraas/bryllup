import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import type { User } from "@prisma/client";
import { Link, useLocation } from "@remix-run/react";
import { ProfileLogout } from "./ProfileLogout";

type ProfileLoginLogoutProps = { user: User | null };

export function ProfileLoginLogout({
  user,
}: ProfileLoginLogoutProps): JSX.Element {
  const location = useLocation();
  return (
    <div>
      {user ? (
        <ProfileLogout user={user} />
      ) : (
        <Link
          to={{
            pathname: "/logg-inn",
            search: `redirectTo=${location.pathname}`,
          }}
          className="text-md inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-900 bg-sand-100 py-2 px-4 font-medium text-slate-900 shadow-sm hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          Logg inn
        </Link>
      )}
    </div>
  );
}
