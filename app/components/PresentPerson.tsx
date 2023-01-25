import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDimensions } from "./hooks/useDimentions";
import { PopupImage } from "./PopupImage";

type PresentPersonProps = {
  bgSrc: string;
  mainSrc: string;
  text: string;
  name: string;
};

// const background: Variants = {
//   open: (height: number) => ({
//     clipPath: `circle(${height}px at 50% 50%)`,
//     // height: `${height}px`,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       restDelta: 20,
//     },
//   }),
//   closed: {
//     clipPath: "circle(1px at 50% 50%)",
//     transition: {
//       delay: 0.3,
//       type: "spring",
//       stiffness: 400,
//       damping: 40,
//     },
//   },
// };

const content: Variants = {
  open: (height: number) => ({
    clipPath: `circle(115% at top)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: `circle(1% at top)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
};
const contentHeight: Variants = {
  open: (height: number) => ({
    height: `calc(${height}px + 6rem)`,
    transition: {
      type: "just",
    },
  }),
  closed: {
    height: 0,
    transition: {
      type: "just",
    },
  },
};

export function PresentPerson({
  mainSrc,
  bgSrc,
  name,
  text,
}: PresentPersonProps): JSX.Element {
  const [isSelected, setIsSelected] = useState(false);
  const contentRef = useRef(null);
  const contentHight = useDimensions(contentRef).height;
  return (
    <motion.button
      onClick={() => setIsSelected((prevState) => !prevState)}
      whileHover={"hover"}
      onHoverEnd={() => setIsSelected(false)}
      className={twMerge(
        "group relative grid w-full max-w-[200px] place-items-center overflow-visible rounded-lg duration-200",
        isSelected && "z-20"
      )}
      initial={false}
      animate={isSelected ? "open" : "closed"}
    >
      <div className="z-10">
        <PopupImage bgSrc={bgSrc} mainSrc={mainSrc} alt={name} />
        <h4 className="text-lg font-bold">{name}</h4>
      </div>
      <motion.div
        className="absolute inset-0 top-1/2 mt-1 origin-top overflow-hidden rounded-lg bg-white pt-24 shadow"
        variants={content}
        // style={{ height: isSelected ? `calc(${contentHight}px + 6rem)` : 0 }}
        // exit={{ height: 0 }}
        // animate={{ height: `calc(${contentHight}px + 6rem)` }}

        // animate={{ height: 0 }}
        custom={contentHight}
      >
        <div className="flex" ref={contentRef}>
          {text}
        </div>
      </motion.div>
    </motion.button>
  );
}
