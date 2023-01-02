import Image from "remix-image";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ArrowLink } from "~/components/ArrowButton";

function getCountDown(fromDate: dayjs.Dayjs) {
  return dayjs.duration(dayjs("2023-09-19").diff(fromDate));
}

export default function Index() {
  const [countDown, setCountDown] = useState(getCountDown(dayjs()));

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountDown(getCountDown(dayjs()));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [countDown]);

  return (
    <main>
      <div className="pb-safe flex h-screen flex-col min-h-iphone-safe sm:flex-row">
        <div className="relative flex flex-1 basis-full">
          <Image
            loaderUrl="/api/image"
            className="h-full w-full object-cover opacity-50"
            src="./images/initImage.jpg"
            alt="Louise og Lars Erik"
            dprVariants={[1, 3]}
          />
          <div className="absolute top-1/2 w-full -translate-y-1/2 py-4 text-center">
            <h1 className="font-heading text-5xl sm:text-7xl">
              Louise <br /> og <br />
              Lars Erik
            </h1>
            <p className="pt-3 text-lg font-light sm:text-xl">
              Vi gleder oss til å feire denne dagen med deg!
            </p>
          </div>
        </div>
        <div className=" flex flex-1 basis-full flex-col content-center items-center justify-center gap-2 text-center text-slate-900">
          <h2 className="text-4xl font-light sm:text-5xl">
            Grønolen Fjellgard
          </h2>
          <h3>18-20 August 2022</h3>
          <p className="flex gap-2">
            <span>{Math.floor(countDown.asDays())} dager</span>
            <span>{countDown.hours()} timer</span>
            <span>{countDown.minutes()} minutter</span>
            <span>{countDown.seconds()} sekunder</span>
          </p>

          <ArrowLink className="pt-4" to="/informasjon" direction="right">
            Finn ut mer
          </ArrowLink>
        </div>
      </div>
    </main>
  );
}
