import React from "react";

type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export function Card({ title, children }: CardProps): JSX.Element {
  return (
    <div className="max-w-lg rounded-lg bg-white p-4 shadow">
      {title && <h2 className="font mb-4 text-3xl font-extralight">{title}</h2>}
      {children}
    </div>
  );
}
