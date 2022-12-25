import { PresentPerson } from "~/components/PresentPerson";
import { Card } from "~/components/Card";
import { PageGrid } from "~/components/PageGrid";
import { Link } from "@remix-run/react";
import { MainLayout } from "~/components/layout/MainLayout";

export default function Index() {
  return (
    <MainLayout heading="Informasjon">
      <PageGrid>
        <div className="grid content-start gap-4">
          <Card title="Overnatting">
            <div className="grid gap-2">
              <p>
                Bryllupet vårt arrangeres på Grønolen Fjellgard, en flott
                fjellgård på Beitostølen.
                <Link
                  to="/overnatting"
                  className="block font-medium italic underline hover:text-sand-800"
                >
                  Finn ut mer her
                </Link>
              </p>
            </div>
          </Card>
          <Card title="Ønskeliste">
            <div className="grid gap-2">
              <p>
                Ettersom denne helgen innebærer kostnader ved reise og opphold
                er det for oss en stor gave i seg selv at du blir med på
                feiringen. Vi ønsker ingen gaver utover det.
              </p>
            </div>
          </Card>
          <Card title="Tale?">
            <div className="grid gap-2">
              <p></p>
            </div>
          </Card>
        </div>
        <div className="grid gap-8">
          <div>
            <h2 className="mb-4 text-3xl font-extralight">Forlovere </h2>
            <div className="flex flex-wrap">
              <PresentPerson
                imgSrc="./images/kristine.jpeg"
                name="Kristine"
                text=""
              />
              <PresentPerson
                imgSrc="./images/kristoffer.jpg"
                name="Kristoffer"
                text="Kristoffer er en av Lars Erik sine forlovere. De er barndomsvenner og har kjent hverandre siden barnehagen"
              />
              <PresentPerson
                imgSrc="./images/magnus.jpg"
                name="Magnus"
                text="Magnus er en av Lars Erik sine forlovere. De er barndomsvenner og har kjent hverandre siden barnehagen"
              />
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-light">Toastmaster</h2>
            <PresentPerson
              imgSrc="./images/torjus.jpg"
              name="Torjus"
              text="torjus"
            />
          </div>
        </div>
      </PageGrid>
    </MainLayout>
  );
}
