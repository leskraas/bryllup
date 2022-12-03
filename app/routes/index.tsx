import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  NavLink,
  Outlet,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import Image, { MimeType } from "remix-image";
import dayjs from "dayjs";
// import { requireUserId } from "~/session.server";
import LogLHjem from "/images/LogLHjem.png";
import { useEffect, useRef, useState } from "react";
import { ArrowLink } from "~/components/ArrowButton";
import { motion } from "framer-motion";

export async function loader({ request, params }: LoaderArgs) {
  // const userId = await requireUserId(request);
  // invariant(params.noteId, "noteId not found");

  // const note = await getNote({ userId, id: params.noteId });
  // if (!note) {
  //   throw new Response("Not Found", { status: 404 });
  // }
  return json({ hei: "hei" });
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

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

  // style={{stroke:"#000",strokeWidth:"0.25mm",fill:"#000"}}

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
          <h2 className="text-4xl font-light sm:text-5xl">Grønolen Fjellgard</h2>
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
