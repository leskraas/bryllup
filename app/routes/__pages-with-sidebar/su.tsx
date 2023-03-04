import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Attend } from "@prisma/client";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import { Input } from "~/components/Input";
import { InputTexterea } from "~/components/InputTexterea";
import { MainLayout } from "~/components/layout/MainLayout";
import { ProfileImage } from "~/components/ProfileImage";
import { RadioButton } from "~/components/RadioButton";
import { UserSelector } from "~/components/UserSelector";
import { createRsvp, getAllRsvp, getRsvpById } from "~/models/rsvp.server";
import { getAllUsers, verifyLogin } from "~/models/user.server";
import { createUserSession, getUser } from "~/session.server";
import { attendLabel } from "~/utils/attendLabel";

export async function loader({ request }: LoaderArgs) {
  const loggedInUser = await getUser(request);
  const loggedInUserId = loggedInUser?.id;
  const isLoggedIn = !!loggedInUserId;
  const allRsvp = isLoggedIn ? await getAllRsvp() : null;

  const allUsers = await getAllUsers();
  if (!isLoggedIn) {
    return json({
      allUsers,
      isLoggedIn,
      rsvpLoggedInUser: null,
      loggedInUser: null,
      allRsvp,
    });
  }

  const rsvpLoggedInUser = await getRsvpById(loggedInUserId);
  console.log(rsvpLoggedInUser);

  return json({
    allUsers,
    isLoggedIn,
    rsvpLoggedInUser,
    loggedInUser,
    allRsvp,
  });
}

function isValidAttendResponse(formData: unknown): formData is Attend {
  return typeof formData === "string" && formData in Attend;
}

function isStringAndExist(formData: unknown): formData is string {
  return typeof formData === "string" && formData.length > 0;
}

export async function action({ request }: ActionArgs) {
  const submitter = await getUser(request);
  const isSubmitterLoggedIn = !!submitter;
  const htmlFormData = await request.formData();
  const name = htmlFormData.get("name");
  const password = htmlFormData.get("password");
  const attend = htmlFormData.get("attend");
  const additionalInfo = htmlFormData.get("additionalInfo");

  if (!isStringAndExist(name)) {
    return json(
      {
        errors: {
          name: "Navn er påkrevd",
          password: null,
          attend: null,
          other: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof additionalInfo !== "string") {
    return json(
      {
        errors: {
          name: null,
          password: null,
          attend: null,
          other: "Beklager! En uvented feil har oppstått.",
        },
      },
      { status: 400 }
    );
  }

  if (!isValidAttendResponse(attend)) {
    return json(
      {
        errors: {
          name: null,
          password: null,
          other: null,
          attend: "Du må huke av et av alternativene",
        },
      },
      { status: 400 }
    );
  }

  if (isSubmitterLoggedIn) {
    await createRsvp({
      additionalInfo,
      attend,
      attenderName: name,
      submitterName: submitter.name,
    });
    return json(
      {
        errors: {
          password: null,
          email: null,
          attend: null,
          other: null,
          name: null,
        },
      },
      { status: 200 }
    );
  }

  if (!isStringAndExist(password)) {
    return json(
      {
        errors: {
          password: "Passord er påkrevd",
          email: null,
          attend: null,
          other: null,
          name: null,
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
          password: "Navn og passord samsvarer ikke",
          attend: null,
          other: null,
        },
      },
      { status: 400 }
    );
  }

  await createRsvp({
    additionalInfo,
    attend,
    attenderName: name,
    submitterName: name,
  });

  return createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo: request.url,
  });
}

export default function Rsvp(): JSX.Element {
  const { allUsers, isLoggedIn, loggedInUser, rsvpLoggedInUser, allRsvp } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const additionalInfoRef = useRef<HTMLTextAreaElement>(null);
  const [selectedUser, setSelectedUser] = useState(
    loggedInUser
      ? {
          imgSrc: loggedInUser.imgSrc,
          name: loggedInUser.name,
        }
      : null
  );
  const isSubmittingForAnotherUser =
    isLoggedIn && selectedUser?.name !== loggedInUser?.name;

  const currentSelectedUserPreviousRsvp = allRsvp?.find(
    ({ name }) => name === selectedUser?.name
  );

  useEffect(() => {
    const additionalInfoRsvpLoggedInUser = rsvpLoggedInUser?.find(
      (e) => e.attenderName === selectedUser?.name
    )?.additionalInfo;

    const additionalInfoDefaultValue = additionalInfoRsvpLoggedInUser?.length
      ? additionalInfoRsvpLoggedInUser
      : loggedInUser?.name === selectedUser?.name && loggedInUser?.rsvps?.length
      ? loggedInUser.rsvps[loggedInUser.rsvps.length - 1].additionalInfo
      : "";
    if (additionalInfoRef.current) {
      additionalInfoRef.current.value = additionalInfoDefaultValue || "";
    }
  }, [loggedInUser?.name, loggedInUser?.rsvps, rsvpLoggedInUser, selectedUser]);

  return (
    <MainLayout heading="Svar utbedes">
      <div className="grid gap-4">
        <Form method="post" replace>
          <Card>
            <div className="sm:p-4">
              <div className="grid grid-cols-6 gap-6">
                {loggedInUser?.name && (
                  <h2 className="col-span-6 text-3xl font-extralight">
                    Hei {loggedInUser.name}!
                  </h2>
                )}
                <UserSelector
                  name="name"
                  className="col-span-6 sm:col-span-4"
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  allUsers={allUsers}
                  errorMessage={actionData?.errors.name}
                />
                {isSubmittingForAnotherUser && (
                  <div className="col-span-6 rounded-lg bg-blue-50 p-4">
                    <p className="flex items-center gap-2 text-blue-600">
                      <InformationCircleIcon className="h-5 w-5" />
                      Obs! Du svarer nå på vegne av en annen gjest.
                    </p>
                  </div>
                )}
                {!isLoggedIn && (
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
                      defaultChecked={
                        currentSelectedUserPreviousRsvp?.rsvp?.attend ===
                        Attend.YES
                      }
                      label={attendLabel[Attend.YES]}
                    />
                    <RadioButton
                      id="attend-only-saturday"
                      name="attend"
                      value={Attend.SATURDAY}
                      defaultChecked={
                        currentSelectedUserPreviousRsvp?.rsvp?.attend ===
                        Attend.SATURDAY
                      }
                      label={attendLabel[Attend.SATURDAY]}
                    />
                    <RadioButton
                      id="attend-no"
                      name="attend"
                      value={Attend.NO}
                      defaultChecked={
                        currentSelectedUserPreviousRsvp?.rsvp?.attend ===
                        Attend.NO
                      }
                      label={attendLabel[Attend.NO]}
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

                <InputTexterea
                  className="col-span-6 sm:col-span-6"
                  name="additionalInfo"
                  id="additionalInfo"
                  autoComplete="allergies"
                  label="Kommentar/Allergier"
                  ref={additionalInfoRef}
                  defaultValue={
                    loggedInUser?.name === selectedUser?.name &&
                    loggedInUser?.rsvps?.length
                      ? loggedInUser.rsvps[loggedInUser.rsvps.length - 1]
                          .additionalInfo || ""
                      : ""
                  }
                  description="Informasjon som kan være nyttig for arrangøren å vite. Svaret ditt vil kun være tilgjengelig for administrator."
                />
                {actionData?.errors.other && (
                  <p
                    id="attend-error"
                    className="mt-1 text-red-600 dark:text-red-500"
                  >
                    {actionData.errors.other}
                  </p>
                )}
              </div>
            </div>

            <div className="px-4 py-3 text-right sm:px-6">
              <Button type="submit">Send inn</Button>
            </div>
          </Card>
        </Form>
        <div>
          {rsvpLoggedInUser && rsvpLoggedInUser.length > 0 && (
            <div className="mb-6 grid gap-5">
              <h3 className="text-2xl font-thin sm:text-3xl">
                Dine innsendte svar:{" "}
              </h3>
              {rsvpLoggedInUser?.map((rsvp) => (
                <div
                  key={`rsvp-${rsvp.attenderName}-${rsvp.submitterName}-${rsvp.id}`}
                  className="grid gap-1"
                >
                  <div className="grid grid-cols-11 gap-1">
                    <ProfileImage
                      fileName={rsvp.attender.imgSrc || ""}
                      name={rsvp.attenderName}
                      className="self-center"
                    />
                    <span className="col-span-5 font-bold text-slate-900">
                      {rsvp.attenderName}
                    </span>
                    <span className="col-span-5">
                      {attendLabel[rsvp.attend]}
                    </span>
                  </div>
                  <div>{rsvp.additionalInfo}</div>
                </div>
              ))}
            </div>
          )}
          <div className="grid gap-5">
            <h3 className="text-2xl font-thin sm:text-3xl">Gjesteliste: </h3>
            {!isLoggedIn && (
              <p>Gjestelisten er kun tilgjengelig når du er logget inn.</p>
            )}
            {allRsvp?.map((user) => (
              <div key={`rsvp-${user.name}-all`}>
                <div className="grid grid-cols-11 gap-1">
                  <ProfileImage
                    fileName={user.imgSrc || ""}
                    name={user.name}
                    className="self-center"
                  />
                  <span className="col-span-5 font-bold text-slate-900">
                    {user.name}
                  </span>
                  <span
                    className={clsx(
                      "col-span-5",
                      !user.rsvp?.attend && "font-bold text-slate-600"
                    )}
                  >
                    {user.rsvp?.attend
                      ? attendLabel[user.rsvp.attend]
                      : "Har ikke svart"}
                  </span>
                  {user.id === loggedInUser?.id && loggedInUser.rsvps.length ? (
                    <p>{loggedInUser.rsvps[0].additionalInfo}</p>
                  ) : null}
                  {user.id !== loggedInUser?.id &&
                    user.rsvps[0] &&
                    rsvpLoggedInUser?.some(
                      (rsvp) => rsvp.id === user.rsvps[0].id
                    ) && (
                      <p>
                        {
                          rsvpLoggedInUser.find(
                            (rsvp) => rsvp.id === user.rsvps[0].id
                          )?.additionalInfo
                        }
                      </p>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
