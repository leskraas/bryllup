import { PresentPerson } from "~/components/PresentPerson";
import { Card } from "~/components/Card";
import { PageGrid } from "~/components/PageGrid";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { MainLayout } from "~/components/layout/MainLayout";
import { A } from "~/components/A";
import { LoaderArgs, json } from "@remix-run/server-runtime";
import { isLoggedIn } from "~/session.server";
import { Button } from "~/components/Button";
import {
  ArrowLeftOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export async function loader({ request }: LoaderArgs) {
  return json({
    isLoggedIn: await isLoggedIn(request),
  });
}

export default function Index() {
  const { isLoggedIn } = useLoaderData<typeof loader>();
  const location = useLocation();
  return (
    <MainLayout heading="Informasjon">
      <PageGrid>
        <div className="grid content-start gap-4">
          <Card title="Overnatting & Transport">
            <div className="grid gap-2">
              <p>
                <strong>
                  Nå er det mulig å bestille rom hos Grønolen Fjellgard!
                </strong>
              </p>
              <p>
                Vi gifter oss på Grønolen Fjellgard, en flott fjellgård på
                Beitostølen. Alle rommene er reservert til oss denne helgen, så
                det er plass til alle. Vi håper at du/dere vil bo her sammen med
                oss!
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
                laget en liten ønskeliste. Ønskelisten finner dere{" "}
                <A
                  target="_blank"
                  rel="noreferrer"
                  href="https://onskelister.no/liste?id=oGzXtXTVo9GU4FF041x3"
                >
                  her (onskelister.no/liste?id=oGzXtXTVo9GU4FF041x3)
                </A>
                .
              </p>
            </div>
          </Card>
          <Card title="Tale?">
            <div className="grid gap-2">
              <p>
                I et bryllup blir det fort mange og lange taler. Vi tenker "kort
                og godt" og vil derfor ha en tidsbegrensning på taletid til max
                5 min.
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
          <Card
            title={
              <span className="flex items-center gap-2">
                {!isLoggedIn && <LockClosedIcon className="h-5 w-5" />} Musikk
              </span>
            }
          >
            <div className="grid gap-2">
              <p>
                Gjennom kvelden skal vi spille litt musikk. Siden vi er mange
                mennesker og vi har alle ulik musikksmak har vi laget en åpen
                spilleliste som alle kan legge inn ønsker i.{" "}
                {isLoggedIn && (
                  <>
                    Listen heter{" "}
                    <A
                      href="https://open.spotify.com/playlist/7eRE7qVGsqL9NJkGI1faoz?si=3475ab6fa88e4944"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Bryllup Louise og Lars Erik
                    </A>{" "}
                    og du finner den på spotify eller{" "}
                    <A
                      href="https://open.spotify.com/playlist/7eRE7qVGsqL9NJkGI1faoz?si=3475ab6fa88e4944"
                      target="_blank"
                      rel="noreferrer"
                    >
                      her
                    </A>
                    .
                  </>
                )}
              </p>
              {!isLoggedIn ? (
                <>
                  <p>
                    Du må være logget inn for å få tilgang til spillelisten.{" "}
                  </p>
                  <Link
                    to={{
                      pathname: "/logg-inn",
                      search: `redirectTo=${location.pathname}`,
                    }}
                    className="text-md inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-900 bg-sand-100/5 py-2 px-4 font-medium text-slate-900 shadow-sm backdrop-blur-sm hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                    Logg inn
                  </Link>
                </>
              ) : (
                <iframe
                  className="rounded-md"
                  src="https://open.spotify.com/embed/playlist/7eRE7qVGsqL9NJkGI1faoz?utm_source=generator"
                  width="100%"
                  height="400"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              )}
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
                text={[
                  `Kristine er Louise sin forlover. `,
                  `De har kjent hverandre siden 1. klasse på Vinderen barneskole. `,
                  `Kristine er et friluftsmenneske, med flere lengre turer under beltet og 
                er ikke fremmed for å lese krim alene på telttur.`,
                ]}
              />
              <PresentPerson
                mainSrc="./images/kristoffer-removebg.png"
                bgSrc="./images/kristoffer_cleanup.jpg"
                name="Kristoffer"
                text={[
                  `Kristoffer er en av Lars Erik sine forlovere. `,
                  `Kristoffer og Lars Erik ble kjent med hverandre allerede i barnehagen. `,
                  `Kristoffer er et friluftsmenneske med en brennende interesse for billig strøm.`,
                ]}
              />
              <PresentPerson
                mainSrc="./images/magnus-removebg.png"
                bgSrc="./images/magnus_cleanup.jpg"
                name="Magnus"
                text={[
                  `Magnus er en av Lars Erik sine forlovere.`,
                  `Magnus og Lars Erik ble kjent med hverandre tidlig i barneskolen.`,
                  `Magnus er en dedikert politimann med et sterkt engasjement for rettferdighet og samfunnets sikkerhet.`,
                ]}
              />
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-light">Toastmaster</h2>
            <PresentPerson
              bgSrc="./images/torjus_cleanup.jpg"
              mainSrc="./images/torjus-removebg.png"
              name="Torjus"
              text={[
                `Vår toastmaster.`,
                `Torjus og Lars Erik sine stier krysset hverandre første gang på barneskolen, men det var på videregående vi ble virkelig gode venner.`,
                `I tillegg til å være en god venn, er han også en god arbeidskollega i Bredvid. Med sin sterke formidlingsevne og naturlige karisma, er Torjus et perfekt valg i rollen som toastmaster.`,
              ]}
            />
          </div>
        </div>
      </PageGrid>
    </MainLayout>
  );
}
