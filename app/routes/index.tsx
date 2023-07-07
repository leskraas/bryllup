import Image from "remix-image";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ArrowLink } from "~/components/ArrowButton";
import type { MetaFunction } from "@remix-run/node";

function getCountDown(fromDate: dayjs.Dayjs) {
  return dayjs.duration(dayjs("2023-08-19").diff(fromDate));
}

export const meta: MetaFunction = () => ({
  "theme-color": "#C8DFE7",
});

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
    <main className="mb-safe relative flex h-[100svh] w-screen flex-col overflow-hidden bg-[rgb(205,222,229)] min-[800px]:flex-row">
      <div className=" flex flex-1 basis-full">
        <div className="absolute inset-0 max-[700px]:hidden">
          <Image
            loaderUrl="/api/image"
            className="h-full w-full overflow-visible object-cover object-left"
            src="./images/forside_full.webp"
            alt="Louise og Lars Erik"
          />
        </div>
        <div className="fixed inset-0 max-[700px]:hidden">
          <Image
            loaderUrl="/api/image"
            className="h-full w-full overflow-visible object-cover object-left"
            src="./images/forside_full.jpg"
            alt="Louise og Lars Erik"
          />
        </div>
        <div className="absolute inset-0 min-[700px]:hidden">
          <Image
            loaderUrl="/api/image"
            className="h-full w-full overflow-visible object-cover "
            src="./images/forside-d.jpg"
            blurDataURL="./images/forside-d.webp"
            alt="Louise og Lars Erik"
            dprVariants={[1, 3]}
          />
        </div>
        <div className="absolute top-[20%] left-8 right-8 grid -translate-y-1/2 justify-items-center max-[700px]:left-1/2 max-[700px]:w-full max-[700px]:-translate-x-1/2">
          <Image
            loaderUrl="/api/image"
            className="w-full max-w-[600px] object-cover max-[700px]:w-[90%]"
            src="./images/forside_header.png"
            blurDataURL="./images/forside_header.webp"
            alt="Louise og Lars Erik"
            dprVariants={[1, 3]}
          />
        </div>
      </div>
      <div className="flex flex-1 basis-full flex-col content-center items-center justify-center gap-2 text-center text-slate-900">
        <div className="grid justify-items-center gap-2 rounded-md border-[1px] border-white/10  bg-white/30  p-4 shadow-inner drop-shadow backdrop-blur sm:p-8">
          <h2 className="text-2xl font-light sm:text-4xl">18-20 August 2023</h2>
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
