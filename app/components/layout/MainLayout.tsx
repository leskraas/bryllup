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
    <main className="p-2 sm:py-8 sm:pr-8">
      <h1 className="mb-4 font-heading text-5xl text-sand-900 sm:text-6xl">
        {heading}
      </h1>
      {children}
    </main>
  );
}
