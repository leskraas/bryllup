import { Card } from "~/components/Card";
import { PageGrid } from "~/components/PageGrid";
import { ArrowLink } from "~/components/ArrowButton";
import { MainLayout } from "~/components/layout/MainLayout";
import { A } from "~/components/A";

export default function Index() {
  return (
    <MainLayout heading="Overnatting & transport">
      <PageGrid>
        <div className="grid content-start gap-4">
          <Card title="Grønolen Fjellgard">
            <p>
              Vi gifter oss på Grønolen Fjellgard, en flott fjellgård på
              Beitostølen. Alle rommene er reservert til oss denne helgen og vi
              håper at du/dere vil bo her sammen med oss!
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
          <Card title="Bestilling">
            <div className="grid gap-2">
              <p>Rom kan bestilles fra 15.juni. Mer informasjon kommer her.</p>
              {/* <div>
                <ArrowLink
                  className="pt-4"
                  href="https://gronolen.no/booking/"
                  direction="right"
                >
                  Bestill overnatting
                </ArrowLink>
              </div> */}
            </div>
          </Card>
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
