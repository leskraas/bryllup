import React from "react";

type PageGridProps = {
  children: React.ReactNode;
};

export function PageGrid({ children }: PageGridProps): JSX.Element {
  return <div className="mb-4 grid gap-4 sm:grid-cols-2">{children}</div>;
}
