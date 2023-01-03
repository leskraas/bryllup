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
    <div className="group relative grid h-44 w-32 place-content-end place-items-center overflow-hidden rounded-b-full duration-300 ease-in-out group-hover:scale-105">
      <img
        className="absolute bottom-0 w-full rounded-full object-cover"
        src={bgSrc}
        alt={""}
      />
      <img
        className="absolute bottom-0 aspect-square h-40 object-cover duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-110"
        src={mainSrc}
        alt={alt}
      />
    </div>
  );
}
