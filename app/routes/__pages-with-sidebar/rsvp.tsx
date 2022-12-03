import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/server-runtime";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { RadioButton } from "~/components/RadioButton";

export async function action({ request }: ActionArgs) {
  const htmlFormData = await request.formData();
  const name = htmlFormData.get("name");
  const attend = htmlFormData.get("attend");
  console.log("hei", { name, attend });
  return {};
  //   const redirectTo = safeRedirect(htmlFormData.get("redirectTo"), "/");
  //   const remember = htmlFormData.get("remember");
}

export default function Rsvp(): JSX.Element {
  return (
    <main className="m-2 sm:m-8">
      <h1 className="font-heading text-3xl text-sand-900 sm:text-6xl">RSVP</h1>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <Form method="post">
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <Input
                    className="col-span-6 sm:col-span-3"
                    name="name"
                    id="name"
                    autoComplete="name"
                    label="Navn"
                  />
                  <fieldset className="col-span-6">
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
                        value="yes"
                        label="Ja, hele helgen"
                      />
                      <RadioButton
                        id="attend-only-saturday"
                        name="attend"
                        value="only-saturday"
                        label="Ja, men kan kun være der lørdag"
                      />
                      <RadioButton
                        id="attend-no"
                        name="attend"
                        value="no"
                        label="
                      Nei, dessverre"
                      />
                    </div>
                  </fieldset>
                  <Input
                    className="col-span-6 sm:col-span-4"
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
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}
