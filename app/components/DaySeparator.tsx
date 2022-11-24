import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

type DaySeparatorProps = {
  date: Dayjs;
};

export function DaySeparator({ date }: DaySeparatorProps): JSX.Element {
  return (
    <div className="mt-4 flex w-full items-center gap-2 text-sm uppercase">
      <span className="flex-shrink-0">
        {dayjs(date).format("dddd, DD, MMMM")}
      </span>
      <span className="h-[1px] w-full bg-sand-700 opacity-50" />
    </div>
  );
}
