import { Attend } from "@prisma/client";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import { Input } from "~/components/Input";
import { MainLayout } from "~/components/layout/MainLayout";
import { ProfileImage } from "~/components/ProfileImage";
import { RadioButton } from "~/components/RadioButton";
import { UserSelector } from "~/components/UserSelector";
import { getAllUsers, getRsvpById, verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const loggedInUserId = await getUserId(request);
  const isLoggedIn = !!loggedInUserId;
  const allUsers = await getAllUsers();
  if (!isLoggedIn) {
    return json({ allUsers, isLoggedIn, rsvpLoggedInUser: null });
  }

  const rsvpLoggedInUser = await getRsvpById(loggedInUserId);

  return json({ allUsers, isLoggedIn, rsvpLoggedInUser });
}

export async function action({ request }: ActionArgs) {
  const htmlFormData = await request.formData();
  const name = htmlFormData.get("name");
  const password = htmlFormData.get("password");
  const attend = htmlFormData.get("attend");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { name: "Navn er påkrevd", password: null, attend: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { password: "Passord er påkrevd", email: null, attend: null } },
      { status: 400 }
    );
  }
  if (typeof attend !== "string" || !(attend in Attend)) {
    return json(
      {
        errors: {
          name: null,
          password: null,
          attend: "Du må huke av et av alternativene",
        },
      },
      { status: 400 }
    );
  }

  const user = await verifyLogin(name, password);
  if (!user) {
    return json(
      {
        errors: {
          name: null,
          password: "Navn og passord sammsvarer ikke",
          attend: null,
        },
      },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: request.url,
  });
}

export default function Rsvp(): JSX.Element {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <MainLayout heading="Svar utbedes">
      <div className="grid gap-4">
        <Form method="post" replace>
          <Card>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <UserSelector
                  className="col-span-6 sm:col-span-4"
                  name="name"
                  allUsers={loaderData.allUsers}
                />
                {!loaderData.isLoggedIn && (
                  <>
                    <Input
                      className="col-span-3"
                      id="password"
                      label="Passord"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      errorMessage={actionData?.errors.password}
                      description="Passordet finner du i din invitasjon."
                    />
                  </>
                )}
                <fieldset
                  className="col-span-6"
                  aria-describedby="attend-error"
                  aria-invalid={actionData?.errors.attend ? true : undefined}
                >
                  <legend className="contents text-base font-medium text-slate-900">
                    Kommer du?
                  </legend>

                  <div className="mt-4 space-y-4">
                    <RadioButton
                      id="attend-yes"
                      name="attend"
                      value={Attend.YES}
                      label="Ja, hele helgen"
                    />
                    <RadioButton
                      id="attend-only-saturday"
                      name="attend"
                      value={Attend.SATURDAY}
                      label="Ja, men kan kun være der lørdag"
                    />
                    <RadioButton
                      id="attend-no"
                      name="attend"
                      value={Attend.NO}
                      label="
                      Nei, dessverre"
                    />
                  </div>
                  {actionData?.errors.attend && (
                    <p
                      id="attend-error"
                      className="mt-1 text-red-600 dark:text-red-500"
                    >
                      {actionData.errors.attend}
                    </p>
                  )}
                </fieldset>

                <Input
                  className="col-span-6 sm:col-span-6"
                  name="allergies"
                  id="allergies"
                  autoComplete="allergies"
                  label="Allergier"
                />
              </div>
            </div>

            <div className="px-4 py-3 text-right sm:px-6">
              <Button type="submit">Send inn</Button>
            </div>
          </Card>
        </Form>
        <div>
          {loaderData.rsvpLoggedInUser?.length && (
            <div className="grid gap-2">
              <h3 className="text-2xl font-thin">Dine innsendte svar: </h3>
              {loaderData.rsvpLoggedInUser?.map((rsvp) => (
                <div
                  key={`rsvp-${rsvp.attenderName}-${rsvp.submitterName}`}
                  className="grid grid-cols-12"
                >
                  <ProfileImage
                    imgSrc={rsvp.attender.imgSrc || ""}
                    name={rsvp.attenderName}
                  />
                  <span className="col-span-5 font-bold">
                    {rsvp.attenderName}
                  </span>
                  <span>{rsvp.attend}</span>
                  <span className="col-span-5">{rsvp.allergies}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
