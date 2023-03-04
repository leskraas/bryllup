import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { PopupImage } from "./PopupImage";

type PresentPersonProps = {
  bgSrc: string;
  mainSrc: string;
  text: string;
  name: string;
};

export function PresentPerson({
  mainSrc,
  bgSrc,
  name,
  text,
}: PresentPersonProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
      )}
      <motion.button
        onClick={() => setIsOpen((prevState) => !prevState)}
        whileHover="hover"
        className={twMerge(
          "group relative mb-4 flex w-full max-w-[170px] appearance-none flex-col items-center justify-center justify-items-center overflow-visible rounded-lg align-top duration-200 tap-highlight-none"
        )}
        initial={false}
      >
        <PopupImage bgSrc={bgSrc} mainSrc={mainSrc} alt={name} />
        <motion.div
          className={
            "absolute top-full  flex w-full flex-col rounded p-2 shadow"
          }
          initial={false}
          animate={{
            backgroundColor: isOpen ? "white" : "transparent",
            boxShadow: isOpen
              ? "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
              : "none",
          }}
        >
          <h4 className="text-lg font-bold">{name}</h4>
          <AnimatePresence mode="wait">
            {isOpen && (
              <div className="z-20 w-full">
                <motion.div
                  className="bg-white"
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
                  {text}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </>
  );
}
