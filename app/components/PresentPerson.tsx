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
  return (
    <div className="group relative grid w-48 place-items-center rounded-lg duration-200">
      <PopupImage bgSrc={bgSrc} mainSrc={mainSrc} alt={name} />
      <div className="top-full flex flex-col items-center text-center">
        <h4 className="text-lg">{name}</h4>
        <p className="absolute -translate-y-full opacity-0 duration-500 group-hover:translate-y-10 group-hover:opacity-100">
          {text}
        </p>
      </div>
    </div>
  );
}
