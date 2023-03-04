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
        <Agenda timeFrom="18:00" timeTo="" title="Middag">
          <p>Buffet / grilling. Vi spiser og hygger oss.</p>
        </Agenda>
        <Agenda timeFrom="19:00" timeTo="" title="Leker og mingling">
          <p>
            Vi har planlagt litt leker. En god måte å bli kjent med hverandre
            før den store dagen.
          </p>
        </Agenda>
        <DaySeparator date={dayjs("2023-08-19", "YYYY-MM-DD")} />
        <Agenda timeFrom="08:00" timeTo="10:00" title="Frokost">
          <p>
            Det serveres frokost. Viktig å spise godt, det blir en lang dag.
          </p>
        </Agenda>
        <Agenda timeFrom="11:00" timeTo="12:00" title="Dra til kirken">
          <p>
            Vi drar til kirken. For å redusere antall biler på veien så
            anbefaler vi at vi fyller opp bilene så godt det lar seg gjøre.
          </p>
        </Agenda>
        <Agenda timeFrom="12:00" timeTo="13:00" title="Vielse">
          <p>Vi gifter oss!</p>
        </Agenda>
        <Agenda timeFrom="13:00" timeTo="13:30" title="Fellessbilde">
          <p>
            Vi ønsker et fellesbilde med alle før vi reiser tilbake til
            Grønolen.
          </p>
        </Agenda>
        <Agenda timeFrom="13:30" timeTo="16:00" title="Apertif ++">
          <p>
            På Grønolen fjellgard vil det bli servert apertif. De som vil skifte
            ut av bunad og touche opp sminken etter en tårevåt vielse kan gjøre
            det.
          </p>
          <p>Brudeparet tar bilder.</p>
        </Agenda>
        <Agenda timeFrom="16:00" timeTo="19:00" title="Middag">
          <p> Middag og taler.</p>
        </Agenda>
        <Agenda timeFrom="19:00" timeTo="20:00" title="Kaffe og kake">
          <p>
            {" "}
            Vi forflytter oss ned i stuen etter middag. Vi mingler mens det
            serveres kaffe og kake.{" "}
          </p>
        </Agenda>
        <Agenda timeFrom="20:00" timeTo="" title="Bryllupsdans">
          <p> Kort bryllupsdans.</p>
        </Agenda>
        <Agenda timeFrom="" timeTo="" title="Fest">
          <p> Vi setter i gang festen.</p>
        </Agenda>
        <DaySeparator date={dayjs("2023-08-20", "YYYY-MM-DD")} />
        <Agenda timeFrom="09:00" timeTo="11:00" title="Frokost">
          <p>Frokost serveres.</p>
        </Agenda>
        <Agenda timeFrom="14:00" timeTo="" title="Utsjekk">
          <p>
            Utsjekk skal skje før kl. 14:00. Lurt å spre seg litt utover mellom
            12-14. Vi sier hade og gir hverandre en god klem! Tusen takk for at
            dere ville feire med oss.
          </p>
        </Agenda>
      </Card>
    </MainLayout>
  );
}
