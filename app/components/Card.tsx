import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
  title?: ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function Card({
  title,
  children,
  className: classNames,
}: CardProps): JSX.Element {
  return (
    <div
      className={twMerge("max-w-lg rounded-lg bg-white p-4 shadow", classNames)}
    >
      {title && <h2 className="font mb-4 text-3xl font-extralight">{title}</h2>}
      {children}
    </div>
  );
}
