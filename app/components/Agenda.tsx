import type { ReactNode } from "react";

type AgendaProps = {
  timeFrom: string;
  timeTo: string;
  title: string;
  children: ReactNode;
};

export function Agenda({
  timeFrom,
  timeTo,
  title,
  children,
}: AgendaProps): JSX.Element {
  return (
    <div className="my-2 ml-4 flex gap-4 sm:ml-10">
      <p className="gap-.5 flex flex-col items-center pt-1 font-semibold sm:min-w-[11ch] sm:flex-row sm:items-start sm:justify-end sm:gap-1 sm:pt-0 sm:leading-8">
        <span>{timeFrom}</span>
        {timeFrom && timeTo && <span>-</span>}
        <span>{timeTo}</span>
      </p>
      <div>
        <h3 className="bg- text-lg">{title}</h3>
        <div className="font-light text-sand-800">{children}</div>
      </div>
    </div>
  );
}
