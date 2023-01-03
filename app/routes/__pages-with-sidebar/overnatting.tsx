import { Card } from "~/components/Card";
import { PageGrid } from "~/components/PageGrid";
import { ArrowLink } from "~/components/ArrowButton";
import { MainLayout } from "~/components/layout/MainLayout";

export default function Index() {
  return (
    <MainLayout heading="Overnatting">
      <PageGrid>
        <div className="grid content-start gap-4">
          <Card title="Overnatting">
            <div className="grid gap-2">
              <p>
                Bryllupet arrangeres på Grønolen Fjellgard. Dette er en flott
                fjellgård som befinner seg på Beitostølen.
              </p>
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
