import type { Password, User } from "@prisma/client";
import { useActionData } from "@remix-run/react";
import type { BaseSyntheticEvent } from "react";
import { v4 } from "uuid";
import type { action } from "~/routes/__pages-with-sidebar/admin";
import { Button } from "./Button";
import { Input } from "./Input";

type AddUserInputProps = {
  user?: User;
  password?: Password["password"];
  onCancel?: (e?: BaseSyntheticEvent) => void;
};

function randomIntFromInterval(max: number) {
  return Math.floor(Math.random() * (max - 1));
}

function getPassword() {
  const uuid = v4();
  const length = uuid.length;
  const charOne = uuid[randomIntFromInterval(length)];
  const charTwo = uuid[randomIntFromInterval(length)];
  const charThree = uuid[randomIntFromInterval(length)];
  const charFour = uuid[randomIntFromInterval(length)];
  const charFive = uuid[randomIntFromInterval(length)];

  return `${charOne}${charTwo}${charThree}${charFour}${charFive}`;
}

export function AddUserInput({
  user,
  password,
  onCancel,
}: AddUserInputProps): JSX.Element {
  const actionData = useActionData<typeof action>();
  const randomPassword = getPassword();

  return (
    <fieldset className="grid justify-items-start gap-4">
      <div className="flex">
        <div className="grid grid-cols-3 gap-2">
          <input type="hidden" name="id" value={user?.id} />
          <Input
            id="new-user-img"
            label="Bilde url"
            name="img"
            defaultValue={user?.imgSrc || ""}
          />
          <Input
            id="new-user-name"
            label="Navn"
            name="name"
            defaultValue={user?.name}
            errorMessage={actionData?.errors.name || ""}
          />

          <Input
            id="new-user-password"
            label="Passord"
            name="password"
            defaultValue={password || randomPassword}
            errorMessage={actionData?.errors.password || ""}
          />
        </div>
        <Input
          id="new-user-role"
          label="Admin rolle"
          name="role"
          value="ADMIN"
          defaultChecked={user?.role === "ADMIN"}
          type="checkbox"
          classNameInput="h-4 w-4 rounded m-auto mt-auto"
          className="flex w-[10ch] flex-col items-center"
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          name="_action"
          value={user ? "edit-user" : "add-user"}
        >
          {user ? "Lagre" : "Legg til"}
        </Button>
        {user && onCancel ? (
          <Button onClick={(e) => onCancel(e)} variant="secondary">
            Avbryt
          </Button>
        ) : null}
      </div>
    </fieldset>
  );
}
