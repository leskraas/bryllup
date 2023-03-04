import { Card } from "~/components/Card";
import { PageGrid } from "~/components/PageGrid";
import { ArrowLink } from "~/components/ArrowButton";
import { MainLayout } from "~/components/layout/MainLayout";

export default function Index() {
  return (
    <MainLayout heading="Overnatting & transport">
      <PageGrid>
        <div className="grid content-start gap-4">
          <Card title="Grønolen fjellgard">
            <p>
              Bryllupet vårt arrangeres på Grønolen Fjellgard, en flott
              fjellgård på Beitostølen. Vi har holdt av alle rommene for denne
              helgen, og ønsker at du/dere vil bo her med oss.
            </p>
          </Card>
          <Card title="Pakke og pris">
            <div className="grid gap-2">
              <p>
                Grønolen fjellgard har lagd en overnattingspakke for denne
                anledningen. Denne pakken består av to overnattinger med
                frokost, fra fredag til søndag og med en buffet på fredag kveld
                inludert. Denne pakken koster kr 2.350,- pr person i dobbeltrom
                og kr 2.850,- i enkeltrom.
              </p>
              <p>
                Om dere kun har anledning til å være med en dag, så vil prisene
                samsvare med overnattingsprisene som ligger på{" "}
                <a
                  href="https://gronolen.no/fjellstue-valdres/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium italic underline hover:text-sand-800"
                >
                  nett
                </a>
                .
              </p>
            </div>
          </Card>{" "}
          <Card title="Bestilling">
            <div className="grid gap-2">
              <p>Her kan du bestille.</p>
              <div>
                <ArrowLink
                  className="pt-4"
                  href="https://gronolen.no/booking/"
                  direction="right"
                >
                  Bestill overnatting
                </ArrowLink>
              </div>
            </div>
          </Card>
          <Card title="Transport">
            <div className="grid gap-2">
              <p> Det er mulig å parkere ved Grønolen fjellgard. </p>
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
            alt="Grønolen fjellgard"
            className="object-cover"
          />
        </div>
      </PageGrid>
    </MainLayout>
  );
}
