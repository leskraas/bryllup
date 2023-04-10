import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { AddUserInput } from "~/components/AddUserInput";
import { Button } from "~/components/Button";
import { MainLayout } from "~/components/layout/MainLayout";
import { AdminUserListElement } from "~/components/AdminUserListElement";
import { createUser, deleteUserById, updateUser } from "~/models/user.server";
import { getAllUsersAdmin, requireAdminUser } from "~/session.server";
import clsx from "clsx";
import { Attend } from "@prisma/client";
import { Card } from "~/components/Card";
import { deleteAllRsvp } from "~/models/rsvp.server";
import { useIsSubmissionSuccess } from "~/components/hooks/useIsSubmissionSuccess";

export async function loader({ request }: LoaderArgs) {
  await requireAdminUser(request);
  const allUsers = await getAllUsersAdmin(request);
  return json({ allUsers });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { method } = request;
  const submitAction = formData.get("_action");
  const name = formData.get("name");
  const userIdToDelete = formData.get("delete-user");

  if (
    method === "DELETE" &&
    typeof userIdToDelete === "string" &&
    userIdToDelete.length > 0
  ) {
    try {
      await deleteUserById(userIdToDelete);
      return json({ errors: { password: null, name: null } }, { status: 200 });
    } catch {
      return json({ errors: { password: null, name: null } }, { status: 400 });
    }
  }

  if (method === "DELETE" && submitAction === "delete-all-rsvp") {
    try {
      await deleteAllRsvp();
      return json({ errors: { password: null, name: null } }, { status: 200 });
    } catch {
      return json({ errors: { password: null, name: null } }, { status: 400 });
    }
  }

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

  try {
    if (submitAction === "add-user") {
      await createUser({ name, imgSrc, role }, password);
    }

    if (submitAction === "edit-user") {
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
  const addUserRef = useRef<HTMLFormElement>(null);
  const [editUserId, setEditUserId] = useState<string | null>();
  const { isSubmissionSuccess, transition } = useIsSubmissionSuccess();
  const isEditing =
    transition.submission?.formData.get("_action") === "edit-user";

  useEffect(() => {
    const isAdding =
      transition.submission?.formData.get("_action") === "add-user";
    const isSubmissionComplete = isAdding && isSubmissionSuccess;
    if (isSubmissionComplete && addUserRef.current) {
      addUserRef.current.reset();
    }
  }, [transition, addUserRef, isSubmissionSuccess]);

  useEffect(() => {
    if (isEditing) {
      setEditUserId(null);
    }
  }, [isEditing]);

  return (
    <MainLayout heading="Admin">
      <ul className="grid gap-3">
        {allUsers.map((user) => (
          <li key={user.id} className="grid">
            <>
              {editUserId === user.id ? (
                <div>
                  <Form
                    method="post"
                    onKeyDown={(e) => e.key === "Escape" && setEditUserId(null)}
                  >
                    <AddUserInput
                      user={user}
                      enableAutoFocus
                      password={user.password?.password}
                      onCancel={() => setEditUserId(null)}
                    />
                  </Form>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex-1">
                    <AdminUserListElement
                      user={user}
                      password={user.password?.password}
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <Button
                      type="button"
                      onClick={() => setEditUserId(user.id)}
                      variant="tertiary"
                      isIconButton
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Button>
                    <Form method="delete">
                      <Button
                        type="submit"
                        value={user.id}
                        name="delete-user"
                        isIconButton
                        variant="tertiary"
                        className="text-red-600 hover:bg-red-100 hover:text-red-800"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </Form>
                  </div>
                </div>
              )}
            </>
          </li>
        ))}

        <li>
          <Form ref={addUserRef} method="post">
            <AddUserInput />
          </Form>
        </li>
      </ul>
      <div className="my-4">
        <h2 className="mb-2 text-2xl font-extralight sm:text-3xl">Alle svar</h2>
        <div className="grid grid-cols-4 gap-2">
          <div className="font-bold">Gjest</div>
          <div className="font-bold">Svar</div>
          <div className="font-bold">Innsender</div>
          <div className="font-bold">Kommentar / allergi</div>
          {allUsers.map((user) => (
            <Fragment key={`${user.id}-admin-rsvp`}>
              <div className="font-bold">{user.name}</div>
              <div>
                {user.rsvps?.map((rsvp) => (
                  <div
                    key={`${rsvp.id}-attending`}
                    className={clsx([
                      !rsvp?.attend && "text-red-700",
                      rsvp?.attend === Attend.YES && "text-green-800",
                      rsvp?.attend === Attend.NO && "text-yellow-400",
                      rsvp?.attend === Attend.SATURDAY && "text-orange-400",
                    ])}
                  >
                    {rsvp?.attend ? rsvp.attend : "Har ikke svart"}
                  </div>
                ))}
              </div>
              <div>
                {user.rsvps?.map((rsvp) => (
                  <div key={`${rsvp.id}-submitter`}>{rsvp?.submitterName}</div>
                ))}
              </div>
              <div>
                {user.rsvps?.map((rsvp) => (
                  <div key={`${rsvp.id}-additionalInfo`}>
                    {rsvp?.additionalInfo}
                  </div>
                ))}
              </div>
            </Fragment>
          ))}
          <p>Antall gjester:{allUsers.length}</p>
          <p>
            Antall svar:
            {
              allUsers.filter(
                (user) => user.rsvps.filter((rsvp) => rsvp.attend).length
              ).length
            }
          </p>
          <p>
            helg:
            {
              allUsers.filter(
                (user) =>
                  user.rsvps.filter((rsvp) => rsvp.attend === "YES").length
              ).length
            }{" "}
            lørdag:
            {
              allUsers.filter(
                (user) =>
                  user.rsvps.filter((rsvp) => rsvp.attend === "SATURDAY").length
              ).length
            }{" "}
            nei:
            {
              allUsers.filter(
                (user) =>
                  user.rsvps.filter((rsvp) => rsvp.attend === "NO").length
              ).length
            }
          </p>
        </div>
      </div>
      <Form method="delete">
        <Card title="Faresone" className="mt-10 bg-red-100 text-red-900">
          <p className="pb-4">Vær forsiktig her!</p>
          <Button variant="danger" name="_action" value="delete-all-rsvp">
            Slett alle svar
          </Button>
        </Card>
      </Form>
    </MainLayout>
  );
}
