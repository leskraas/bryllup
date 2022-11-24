import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, NavLink, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Image, { MimeType } from "remix-image";
import dayjs from "dayjs";
// import { requireUserId } from "~/session.server";
import LogLHjem from "/images/LogLHjem.png";
import { useEffect, useRef, useState } from "react";
import { ArrowLink } from "~/components/ArrowButton";

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
      <div className="flex flex-col justify-between min-h-iphone-safe sm:flex-row">
        <div>hei</div>
        <div>sann</div>
      </div>
      <div className="pb-safe flex flex-col justify-between min-h-iphone-safe sm:flex-row">
        <div>hei</div>
        <div>sann</div>
      </div>
    </main>
  );
}
