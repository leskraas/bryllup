import { Popover } from "@headlessui/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { PopupImage } from "./PopupImage";

type PresentPersonProps = {
  bgSrc: string;
  mainSrc: string;
  text: string[];
  name: string;
};

export function PresentPerson({
  mainSrc,
  bgSrc,
  name,
  text,
}: PresentPersonProps): JSX.Element {
  return (
    <Popover className="relative outline-none">
      {({ open }) => (
        <>
          <Popover.Button
            as={motion.button}
            whileHover="pop"
            whileTap="pop"
            className="group relative mb-4 flex w-[180px] appearance-none flex-col items-center justify-center justify-items-center rounded-lg align-top outline-none duration-200 tap-highlight-none"
            initial={false}
          >
            <PopupImage bgSrc={bgSrc} mainSrc={mainSrc} alt={name} />
            <div
              className={twMerge(
                "overflow-hidden rounded-md p-2 transition",
                open && "bg-white shadow"
              )}
            >
              <h3 className="text-lg font-bold">{name}</h3>
              <AnimatePresence mode="wait">
                {open && (
                  <Popover.Panel
                    className="text-center"
                    static
                    as={motion.div}
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          duration: 0.4,
                        },
                        opacity: {
                          duration: 0.25,
                          delay: 0.15,
                        },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: {
                          duration: 0.4,
                        },
                        opacity: {
                          duration: 0.25,
                        },
                      },
                    }}
                  >
                    {text.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </Popover.Panel>
                )}
              </AnimatePresence>
            </div>
          </Popover.Button>
        </>
      )}
    </Popover>
  );
}
