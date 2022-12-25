import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { getAllUsers, verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect } from "~/utils";
import { UserSelector } from "~/components/UserSelector";
import { useEffect, useRef } from "react";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  const allUsers = await getAllUsers();
  return json({ allUsers });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { name: "Navn er påkrevd", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { password: "Passord er påkrevd", name: null } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(name, password);

  if (!user) {
    return json(
      {
        errors: {
          name: null,
          password: "Passord ugyldig",
        },
      },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Logg inn",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/informasjon";
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();
  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="mx-auto grid h-full w-full max-w-md px-8 pt-8">
      <Form method="post" className="space-y-6" noValidate>
        <div className="grid gap-4">
          <h1 className="font-heading text-5xl sm:text-7xl">Logg inn</h1>
          <UserSelector name="name" allUsers={loaderData.allUsers} />
          <Input
            id="password"
            label="Passord"
            ref={passwordRef}
            name="password"
            type="password"
            autoComplete="current-password"
            errorMessage={actionData?.errors.password || ""}
          />
        </div>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Button type="submit">Logg inn</Button>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-900"
            >
              Husk meg
            </label>
          </div>
        </div>
      </Form>
    </div>
  );
}
