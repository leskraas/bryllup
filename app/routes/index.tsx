import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, NavLink, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Image, { MimeType } from "remix-image";
import dayjs from "dayjs";
// import { requireUserId } from "~/session.server";
import LogLHjem from "/images/LogLHjem.png";
import { useEffect, useRef, useState } from "react";
import { ArrowLink } from "~/components/arrow-button";

export async function loader({ request, params }: LoaderArgs) {
  // const userId = await requireUserId(request);
  // invariant(params.noteId, "noteId not found");

  // const note = await getNote({ userId, id: params.noteId });
  // if (!note) {
  //   throw new Response("Not Found", { status: 404 });
  // }
  return json({ hei: "hei" });
}

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
      <div className="flex h-screen flex-col sm:flex-row">
        <div className="relative flex-1 basis-full">
          <Image
            loaderUrl="/api/image"
            className="h-full object-cover opacity-30 "
            src="./images/LogLHjem.jpg"
            alt="Louise og Lars Erik"
            dprVariants={[1, 3]}
          />
          <div className="absolute top-1/2 w-full -translate-y-1/2 py-4 text-center">
            <h1 className="font-heading text-7xl">
              Louise <br /> og <br />
              Lars Erik
            </h1>
            <p className="pt-3 text-xl font-light">
              Vi gleder oss til å feire denne dagen med deg!
            </p>
          </div>
        </div>
        <div className="flex flex-1 basis-full flex-col content-center items-center justify-center gap-2 text-center text-[rgb(194,161,135)]">
          <h2 className="font-heading text-5xl">Grønolen Fjellgard</h2>
          <h3>18-20 August 2022</h3>
          <p className="flex gap-2">
            <span>{Math.floor(countDown.asDays())} dager</span>
            <span>{countDown.hours()} timer</span>
            <span>{countDown.minutes()} minutter</span>
            <span>{countDown.seconds()} sekunder</span>
          </p>

          <ArrowLink className="pt-4" to="#hoved-innhold" direction="down">
            Finn ut mer
          </ArrowLink>
        </div>
      </div>
      <div id="hoved-innhold" className="h-screen">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil explicabo
        sit, assumenda accusamus voluptate libero sunt facere odit, veritatis
        est laboriosam laborum nesciunt incidunt maxime at officiis ad molestias
        impedit.
      </div>
      {/* <Image
        src={"./images/LogLHjem.jpg"}
        loaderUrl="/api/image"
        dprVariants={[1, 3]}
      /> */}
    </main>
  );
}
