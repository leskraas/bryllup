import { PresentPerson } from "~/components/PresentPerson";
import { Card } from "~/components/Card";
import { PageGrid } from "~/components/PageGrid";
import { Link } from "@remix-run/react";
import { MainLayout } from "~/components/layout/MainLayout";
import { A } from "~/components/A";

export default function Index() {
  return (
    <MainLayout heading="Informasjon">
      <PageGrid>
        <div className="grid content-start gap-4">
          <Card title="Overnatting & Transport">
            <div className="grid gap-2">
              <p>
                Vi gifter oss på Grønolen Fjellgard, en flott fjellgård på
                Beitostølen. Alle rommene er reservert til oss denne helgen og
                vi håper at du/dere vil bo her sammen med oss!
                <Link
                  to="/overnatting"
                  className="block font-medium italic underline hover:text-sand-800"
                >
                  Finn ut mer her.
                </Link>
              </p>
            </div>
          </Card>
          <Card title="Kleskode">
            <div className="grid gap-2">
              <p>Dress/mørk dress.</p>
              <p>
                I fjellbryllup-stil er det hyggelig om de som har bunad bruker
                den under vielsen. Mellom vielse og middag er det god tid til å
                skifte om hvis man ønsker det.
              </p>
            </div>
          </Card>
          <Card title="Gaver">
            <div className="grid gap-2">
              <p>
                Ettersom denne helgen innebærer kostnader ved reise og opphold
                er det for oss en stor gave i seg selv at du/dere blir med på
                feiringen.
              </p>
              <p>
                Siden noen likevel har ytret at de ønsker å gi en gave, har vi
                lage en liten ønskeliste her.
              </p>
            </div>
          </Card>
          <Card title="Tale?">
            <div className="grid gap-2">
              <p>
                I et bryllup blir det fort mange og lange taler. Vi tenker "kort
                og godt" og vil derfor ha en tidsbegrensning på taletid til max
                5-7min.
              </p>
              <p>
                De som ønsker å si noen ord kan sende en mail til toastmaster
                Torjus:{" "}
                <A href="mailto:torjus.saethre@gmail.com?subject=Tale i Louise og Lars Erik sitt bryllup">
                  torjus.saethre@gmail.com
                </A>
                .
              </p>
            </div>
          </Card>
          <Card title="En stor takk">
            <div className="grid gap-2">
              <p>
                ...til Julie Marie Skolem, som har laget illustrasjonen som er
                på bryllupsinvitasjonen og nettsiden.
              </p>
              <p>...til våre fantastiske foreldre som har bidratt.</p>
              <p></p>
            </div>
          </Card>
        </div>
        <div className="grid w-full gap-8 place-self-start">
          <div>
            <h2 className="mb-4 text-3xl font-extralight">Forlovere </h2>
            <div className="flex flex-wrap items-start">
              <PresentPerson
                bgSrc="./images/kristine_cleanup.jpg"
                mainSrc="./images/kristine-removebg.png"
                name="Kristine"
                text="Kristine er Louise sin forlover. 
                De har kjent hverandre siden 1. klasse på Vinderen barneskole. 
                Kristine er et friluftsmenneske, med flere lengre turer under beltet og 
                er ikke fremmed for å lese krim alene på telttur."
              />
              <PresentPerson
                mainSrc="./images/kristoffer-removebg.png"
                bgSrc="./images/kristoffer_cleanup.jpg"
                name="Kristoffer"
                text="Kristoffer er en av Lars Erik sine forlovere. 
                Kristoffer og Lars Erik ble kjent med hverandre allerede i barnehagen. 
                Kristoffer er et friluftsmenneske med en brennende interesse for billig strøm"
              />
              <PresentPerson
                mainSrc="./images/magnus-removebg.png"
                bgSrc="./images/magnus_cleanup.jpg"
                name="Magnus"
                text="Magnus er en av Lars Erik sine forlovere. 
                Magnus og Lars Erik ble venner på barneskolen, gjennom rap. 
                Ta gjerne å spør Magnus om hans musikalske evner. 
                "
              />
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-light">Toastmaster</h2>
            <PresentPerson
              bgSrc="./images/torjus_cleanup.jpg"
              mainSrc="./images/torjus-removebg.png"
              name="Torjus"
              text="lorem10 dolor sit amet, consectetur adipiscing elit sed diam nonumy eirmod tempor incididunt ut labore et"
            />
          </div>
        </div>
      </PageGrid>
    </MainLayout>
  );
}
