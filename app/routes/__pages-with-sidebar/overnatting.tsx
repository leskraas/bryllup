import { Card } from "~/components/Card";
import { PageGrid } from "~/components/PageGrid";
import { ArrowLink } from "~/components/ArrowButton";

export default function Index() {
  return (
    <main className="m-2 sm:m-8">
      <h1 className="font-heading text-3xl text-sand-900 sm:text-6xl">
        Overnatting
      </h1>
      <PageGrid>
        <div className="grid content-start gap-4">
          <Card title="Overnatting">
            <div className="grid gap-2">
              <p>
                Bryllupet arrangeres på Grønolen Fjellgard. Dette er en flott
                fjellgård som befinner seg på Beitostølen.
              </p>
              <p>
                <ArrowLink
                  className="pt-4"
                  href="https://gronolen.no/booking/"
                  direction="right"
                >
                  Bestill overnatting
                </ArrowLink>
              </p>
            </div>
          </Card>
        </div>
        <div>
          <img
            src="./images/gronolen_fjellgard.jpeg"
            alt="Grønolen fjellgard"
            className="object-cover"
          />
        </div>
      </PageGrid>
    </main>
  );
}
