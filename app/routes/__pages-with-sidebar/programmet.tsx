import dayjs from "dayjs";
import { Agenda } from "~/components/Agenda";
import { Card } from "~/components/Card";
import { DaySeparator } from "~/components/DaySeparator";
import { MainLayout } from "~/components/layout/MainLayout";

export default function Index() {
  return (
    <MainLayout heading="Programmet">
      <Card>
        <DaySeparator date={dayjs("2023-08-18", "YYYY-MM-DD")} />
        <Agenda timeFrom="18:00" timeTo="19:30" title="Buffet">
          <div className="space-y-2">
            <p>
              Buffet. Vi spiser og hygger oss. Om noen skulle komme sent opp, så
              gi oss beskjed så kan vi holde av noe mat.
            </p>
          </div>
        </Agenda>
        <Agenda timeFrom="19:30" timeTo="" title="Mingling og leker">
          <div className="space-y-2">
            <p>
              Vi har planlagt litt leker. En god måte å bli kjent med hverandre
              før den store dagen.
            </p>
          </div>
        </Agenda>
        <DaySeparator date={dayjs("2023-08-19", "YYYY-MM-DD")} />
        <Agenda timeFrom="08:00" timeTo="10:00" title="Frokost">
          <p>
            Det serveres frokost. Viktig å spise godt, det blir en lang dag.
          </p>
        </Agenda>
        <Agenda timeFrom="11:00" timeTo="12:00" title="Dra til Lidar kirke">
          <p>
            For å redusere antall biler på veien anbefaler vi at vi fyller opp
            bilene så godt det lar seg gjøre.
          </p>
        </Agenda>
        <Agenda timeFrom="12:00" timeTo="13:00" title="Vielse">
          <p>Vi gifter oss &hearts;</p>
        </Agenda>

        <Agenda
          timeFrom="14:00"
          timeTo="17:00"
          title="Apertif, fingermat og mingling"
        >
          <div className="space-y-2">
            <p>
              De som vil skifte fra bunad og touche opp sminken etter en tårevåt
              vielse kan gjøre det.
            </p>
            <p>
              På Grønolen Fjellgard vil det bli servert apertif og fingermat
              kl.15.
            </p>
            <p>Brudeparet tar bilder på lokasjon og ankommer ca kl.15.</p>
            <p>Vi ønsker et fellesbilde med alle.</p>
          </div>
        </Agenda>
        <Agenda timeFrom="17:00" timeTo="21:00" title="Middag">
          <p>Middag og taler.</p>
        </Agenda>
        <Agenda timeFrom="21:30" timeTo="22:00" title="Kaffe og kake">
          <p>
            Vi forflytter oss ned i stuen etter middag. Vi mingler mens det
            serveres kaffe og kake.
          </p>
        </Agenda>
        <Agenda timeFrom="22:00" timeTo="" title="Bryllupsdans">
          <p>Kort bryllupsdans.</p>
        </Agenda>
        <Agenda timeFrom="" timeTo="" title="Fest">
          <p>Vi setter i gang festen.</p>
        </Agenda>
        <DaySeparator date={dayjs("2023-08-20", "YYYY-MM-DD")} />
        <Agenda timeFrom="09:00" timeTo="11:00" title="Frokost">
          <p>Frokost serveres.</p>
        </Agenda>
        <Agenda timeFrom="14:00" timeTo="" title="Utsjekk">
          <p>
            Utsjekk skal skje før kl. 14:00. Lurt å spre dette litt utover
            mellom 12-14. Vi takker for laget og er glade for at du/dere ville
            feire denne store dagen med oss.
          </p>
        </Agenda>
      </Card>
    </MainLayout>
  );
}
