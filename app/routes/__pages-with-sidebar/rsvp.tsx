import { Attend } from "@prisma/client";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import { Input } from "~/components/Input";
import { MainLayout } from "~/components/layout/MainLayout";
import { RadioButton } from "~/components/RadioButton";
import { UserSelector } from "~/components/UserSelector";
import { getAllUsers, verifyLogin } from "~/models/user.server";
import { createUserSession, isLoggedIn } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const loggedIn = await isLoggedIn(request);
  const allUsers = await getAllUsers();
  return json({ allUsers, isLoggedIn: loggedIn });
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
    <MainLayout heading="RSVP">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
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
                    <Input
                      className="col-span-3"
                      id="password"
                      label="Passord"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      errorMessage={actionData?.errors.password}
                    />
                  )}
                  <fieldset
                    className="col-span-6"
                    aria-describedby="attend-error"
                    aria-invalid={actionData?.errors.attend ? true : undefined}
                  >
                    <legend className="contents text-base font-medium text-slate-900">
                      Kommer du?
                    </legend>
                    {/* <p className="text-sm text-slate-500">
                      Håper du har lyst å tilbringe en helg på Beitstølen med
                      oss!
                    </p> */}
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
        </div>
      </div>
    </MainLayout>
  );
}
