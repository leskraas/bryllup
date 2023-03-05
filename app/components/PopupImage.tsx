import { motion } from "framer-motion";

type PopupImageProps = {
  bgSrc: string;
  mainSrc: string;
  alt: string;
};

export function PopupImage({
  alt,
  bgSrc,
  mainSrc,
}: PopupImageProps): JSX.Element {
  return (
    <motion.div className="relative grid h-44 w-32 place-content-end place-items-center overflow-hidden rounded-b-full duration-300 ease-in-out group-hover:scale-105">
      <img
        className="pointer-events-none absolute bottom-0 w-full touch-none rounded-full object-cover touch-iphone-fix"
        src={bgSrc}
        alt={""}
      />
      <motion.img
        className="pointer-events-none absolute bottom-0 aspect-square h-40 touch-none rounded-b-full object-cover touch-iphone-fix"
        src={mainSrc}
        variants={{
          pop: {
            scale: 1.15,
            translateY: "-.5rem",
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 10,
            },
          },
        }}
        alt={alt}
      />
    </motion.div>
  );
}
