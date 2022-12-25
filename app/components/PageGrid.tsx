import React from "react";

type PageGridProps = {
  children: React.ReactNode;
};

export function PageGrid({ children }: PageGridProps): JSX.Element {
  return <div className="mb-4 grid grid-cols-2 gap-4">{children}</div>;
}
