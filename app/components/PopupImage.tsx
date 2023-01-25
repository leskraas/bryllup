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
    <motion.div
      // whileHover="hover"
      className="group relative grid h-44 w-32 place-content-end place-items-center overflow-hidden rounded-b-full duration-300 ease-in-out group-hover:scale-105"
    >
      <img
        className="absolute bottom-0 w-full rounded-full object-cover"
        src={bgSrc}
        alt={""}
      />
      <motion.img
        className="absolute bottom-0 aspect-square h-40 object-cover"
        src={mainSrc}
        variants={{
          hover: {
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