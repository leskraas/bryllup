import dayjs from "dayjs";
import { Agenda } from "~/components/Agenda";
import { PresentPerson } from "~/components/PresentPerson";
import { Card } from "~/components/Card";
import { DaySeparator } from "~/components/DaySeparator";
import { MainLayout } from "~/components/layout/MainLayout";

export default function Index() {
  return (
    <MainLayout heading="Programmet">
      <Card>
        <DaySeparator date={dayjs("2023.08.18")} />
        <Agenda timeFrom="" timeTo="10:00" title="Frokost">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            excepturi. Ex, illo? Exercitationem dolor et sed quaerat, aliquam
            expedita modi nemo veniam officia odio, minima, at voluptatibus
            culpa eaque sint.
          </p>
        </Agenda>
        <Agenda timeFrom="11:00" timeTo="12:00" title="Dra til kirken">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            excepturi. Ex, illo? Exercitationem dolor et sed quaerat, aliquam
            expedita modi nemo veniam officia odio, minima, at voluptatibus
            culpa eaque sint.
          </p>
        </Agenda>
        <DaySeparator date={dayjs("2023.08.19")} />
        <Agenda timeFrom="08:00" timeTo="10:00" title="Frokost">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            excepturi. Ex, illo? Exercitationem dolor et sed quaerat, aliquam
            expedita modi nemo veniam officia odio, minima, at voluptatibus
            culpa eaque sint.
          </p>
        </Agenda>
        <Agenda timeFrom="11:00" timeTo="12:00" title="Dra til kirken">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            excepturi. Ex, illo? Exercitationem dolor et sed quaerat, aliquam
            expedita modi nemo veniam officia odio, minima, at voluptatibus
            culpa eaque sint.
          </p>
        </Agenda>
        <DaySeparator date={dayjs("2023.08.20")} />
        <Agenda timeFrom="08:00" timeTo="10:00" title="Frokost">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            excepturi. Ex, illo? Exercitationem dolor et sed quaerat, aliquam
            expedita modi nemo veniam officia odio, minima, at voluptatibus
            culpa eaque sint.
          </p>
        </Agenda>
        <Agenda timeFrom="11:00" timeTo="12:00" title="Dra til kirken">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            excepturi. Ex, illo? Exercitationem dolor et sed quaerat, aliquam
            expedita modi nemo veniam officia odio, minima, at voluptatibus
            culpa eaque sint.
          </p>
        </Agenda>
      </Card>
    </MainLayout>
  );
}
