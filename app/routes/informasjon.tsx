import dayjs from "dayjs";
import { Agenda } from "~/components/Agenda";
import { Bridemaids } from "~/components/Bridemaids";
import { DaySeparator } from "~/components/DaySeparator";

export default function Index() {
  return (
    <main className="m-2 sm:m-8">
      <h1 className="font-heading text-5xl sm:text-6xl">Informasjon</h1>
      <p className="mt-4 sm:mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
        excepturi. Ex, illo? Exercitationem dolor et sed quaerat, aliquam
        expedita modi nemo veniam officia odio, minima, at voluptatibus culpa
        eaque sint.
      </p>
      <div>
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
      </div>
      <div>
        <Bridemaids />
      </div>
    </main>
  );
}
