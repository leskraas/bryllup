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
    <motion.button
      onClick={() => setIsOpen((prevState) => !prevState)}
      whileHover="hover"
      className={twMerge(
        "group relative grid w-full max-w-[170px] appearance-none justify-items-center overflow-visible rounded-lg align-top duration-200 tap-highlight-none"
      )}
      initial={false}
    >
      <PopupImage bgSrc={bgSrc} mainSrc={mainSrc} alt={name} />
      <motion.div
        className={"rounded-m flex flex-col p-2"}
        initial={false}
        animate={{
          backgroundColor: isOpen ? "white" : "transparent",
        }}
      >
        <h4 className="text-lg font-bold">{name}</h4>
        <AnimatePresence mode="wait">
          {isOpen && (
            <div className="relative z-10">
              <motion.div
                className="bg-white"
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  position: "absolute",
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
  );
}
