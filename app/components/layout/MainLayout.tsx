import type { ReactNode } from "react";

type MainLayoutProps = {
  heading: string;
  children: ReactNode;
};

export function MainLayout({
  heading,
  children,
}: MainLayoutProps): JSX.Element {
  return (
    <main className="m-2 sm:m-8">
      <h1 className="mb-4 font-heading text-3xl text-sand-900 sm:text-6xl">
        {heading}
      </h1>
      {children}
    </main>
  );
}
