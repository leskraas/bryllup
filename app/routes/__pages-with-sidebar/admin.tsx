import { PencilIcon } from "@heroicons/react/24/outline";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { AddUserInput } from "~/components/AddUserInput";
import { Button } from "~/components/Button";
import { MainLayout } from "~/components/layout/MainLayout";
import { AdminUserListElement } from "~/components/AdminUserListElement";
import { createUser, updateUser } from "~/models/user.server";
import { getAllUsersAdmin, requireAdminUser } from "~/session.server";
import clsx from "clsx";
import { Attend } from "@prisma/client";

export async function loader({ request }: LoaderArgs) {
  await requireAdminUser(request);
  const allUsers = await getAllUsersAdmin(request);
  return json({ allUsers });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const addUserSubmit = formData.get("_action");
  const name = formData.get("name");
  const id = formData.get("id");
  const password = formData.get("password");
  const role = formData.get("role") === "ADMIN" ? "ADMIN" : "GUEST";
  const img = formData.get("img");
  const imgSrc = typeof img !== "string" || img.length === 0 ? null : img;
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
  console.log({ name, password, imgSrc, role, id });

  try {
    if (addUserSubmit === "add-user") {
      await createUser({ name, imgSrc, role }, password);
    }

    if (addUserSubmit === "edit-user") {
      if (typeof id !== "string" || id.length === 0) {
        return json(
          { errors: { password: null, name: null, id: "Mangler id" } },
          { status: 400 }
        );
      }
      await updateUser({ name, imgSrc, role, id }, password);
    }
    return json({ errors: { password: null, name: null } }, { status: 200 });
  } catch {
    return json({ errors: { password: null, name: null } }, { status: 400 });
  }
}

export default function Admin(): JSX.Element {
  const { allUsers } = useLoaderData<typeof loader>();
  const formRef = useRef<HTMLFormElement>(null);
  const [editUserId, setEditUserId] = useState<string | null>();
  const transition = useTransition();
  const isAdding =
    transition.submission?.formData.get("_action") === "add-user";
  const isEditing =
    transition.submission?.formData.get("_action") === "edit-user";

  useEffect(() => {
    if (isAdding && formRef.current) {
      formRef.current.reset();
    }
  }, [isAdding, formRef]);

  useEffect(() => {
    if (isEditing) {
      setEditUserId(null);
    }
  }, [isEditing]);

  return (
    <MainLayout heading="Admin">
      <Form ref={formRef} method="post" replace>
        <ul className="grid gap-3">
          {allUsers.map((user) => (
            <li key={user.id} className="grid">
              <div className="flex">
                {editUserId === user.id ? (
                  <div>
                    <AddUserInput
                      user={user}
                      password={user.password?.password}
                      onCancel={() => setEditUserId(null)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <AdminUserListElement
                        user={user}
                        password={user.password?.password}
                      />
                    </div>
                    <Button
                      onClick={() => setEditUserId(user.id)}
                      variant="tertiary"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>
            </li>
          ))}
          <li>
            <AddUserInput />
          </li>
        </ul>
        <div className="my-4">
          <h2 className="mb-2 text-2xl font-extralight sm:text-3xl">
            Alle svar
          </h2>
          <div className="grid grid-cols-4 gap-2">
            <div className="font-bold">Gjest</div>
            <div className="font-bold">Svar</div>
            <div className="font-bold">Innsender</div>
            <div className="font-bold">Kommentar / allergi</div>
            {allUsers.map((user) => (
              <Fragment key={`${user.id}-admin-rsvp`}>
                <div className="font-bold">{user.name}</div>
                <div
                  className={clsx([
                    !user.rsvp?.attend && "text-red-700",
                    user.rsvp?.attend === Attend.YES && "text-green-800",
                    user.rsvp?.attend === Attend.NO && "text-yellow-400",
                    user.rsvp?.attend === Attend.SATURDAY && "text-orange-400",
                  ])}
                >
                  {user.rsvp?.attend ? user.rsvp.attend : "Har ikke svart"}
                </div>
                <div>{user.rsvp?.submitterName}</div>
                <div>{user.rsvp?.allergies}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </Form>
    </MainLayout>
  );
}
