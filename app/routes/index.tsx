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
      <div className="pb-safe relative flex h-[100svh] h-[100dvh] flex-col min-h-iphone-safe min-[800px]:flex-row">
        <div className=" flex flex-1 basis-full">
          <div className="absolute inset-0 -z-10">
            <Image
              loaderUrl="/api/image"
              className="h-full w-full overflow-visible object-cover object-left max-[700px]:translate-x-[-10vw]"
              src="./images/forside_full.jpg"
              alt="Louise og Lars Erik"
              dprVariants={[1, 3]}
            />
          </div>
          <div className="absolute top-[20%] left-8 w-[600px] -translate-y-1/2 max-[700px]:right-0 max-[700px]:w-full">
            <Image
              loaderUrl="/api/image"
              className="w-full object-cover max-[700px]:w-[90%]"
              src="./images/forside_header.png"
              alt="Louise og Lars Erik"
              dprVariants={[1, 3]}
            />
          </div>
          {/* <div className="absolute top-1/2 w-full -translate-y-1/2 py-4 text-center">
            <h1 className="font-heading text-5xl sm:text-7xl">
              Louise <br /> og <br />
              Lars Erik
            </h1>
            <p className="pt-3 text-lg font-light sm:text-xl">
              Vi gleder oss til å feire denne dagen med deg!
            </p>
          </div> */}
        </div>
        <div className="flex flex-1 basis-full flex-col content-center items-center justify-center gap-2 text-center text-slate-900">
          <div className="grid justify-items-center gap-2 rounded-md bg-white/50 p-8 backdrop-blur">
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
      </div>
    </main>
  );
}
