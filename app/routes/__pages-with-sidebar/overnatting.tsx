import { Card } from "~/components/Card";
import { PageGrid } from "~/components/PageGrid";
import { MainLayout } from "~/components/layout/MainLayout";
import { A } from "~/components/A";

export default function Index() {
  return (
    <MainLayout heading="Overnatting & transport">
      <PageGrid>
        <div className="grid content-start gap-4">
          <Card title="Bestilling">
            <div className="grid gap-2">
              <p className="">
                <strong>
                  Nå er det mulig å bestille rom hos Grønolen Fjellgard!
                </strong>
              </p>
              <p>
                Alt du trenger å gjøre er å sende en e-post til{" "}
                <A href="mailto:gronolen@gronolen.no?subject=Bryllupshelg 19. august">
                  gronolen@gronolen.no
                </A>{" "}
                og oppgi om du ønsker enkelt- eller dobbeltrom, samt antall
                netter du ønsker å bo. Husk å merke emnefeltet i e-posten med
                "Bryllupshelg 19. august".
              </p>
              <p>
                Det er rikelig med rom tilgjengelig på Grønolen Fjellgard, slik
                at alle får plass! Pakke og pris er gitt under.
              </p>
            </div>
          </Card>
          <Card title="Grønolen Fjellgard">
            <p>
              Vi gifter oss på Grønolen Fjellgard, en flott fjellgård på
              Beitostølen. Alle rommene er reservert til oss denne helgen, så
              det er plass til alle. Vi håper at du/dere vil bo her sammen med
              oss!
            </p>
          </Card>
          <Card title="Pakke og pris">
            <div className="grid gap-2">
              <p>
                Grønolen Fjellgard har lagd en overnattingspakke til oss. Pakken
                består av to overnattinger med frokost, fra fredag til søndag.
                Buffet/grilling på fredag kveld er inludert. Pakken koster kr
                2.350,- pr person i dobbeltrom og kr 2.850,- i enkeltrom.
              </p>
              <p>
                Har ikke du/dere anledning til å være med hele helgen, så finner
                du/dere overnattingsprisene på{" "}
                <A
                  href="https://gronolen.no/fjellstue-valdres/"
                  target="_blank"
                  rel="noreferrer"
                >
                  nett
                </A>
                .
              </p>
            </div>
          </Card>{" "}
          <Card title="Transport">
            <div className="grid gap-2">
              <p> Det er mulig å parkere ved Grønolen Fjellgard. </p>
              <p>
                {" "}
                For de som busser, kan man ta Valdres ekspressen til
                Beitostølen. Herfra kan vi arrangere henting. Gi oss beskjed om
                du tar buss, og hvilken buss du kommer med.{" "}
              </p>
            </div>
          </Card>
        </div>
        <div>
          <img
            src="./images/gronolen_fjellgard.jpg"
            alt="Grønolen Fjellgard"
            className="object-cover"
          />
        </div>
      </PageGrid>
    </MainLayout>
  );
}
