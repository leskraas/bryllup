type PresentPersonProps = {
  imgSrc: string;
  text: string;
  name: string;
};

export function PresentPerson({
  imgSrc,
  name,
  text,
}: PresentPersonProps): JSX.Element {
  return (
    <div className="hover group relative grid w-48 place-items-center rounded-full duration-200">
      <img
        className="h-48 w-48 scale-75 rounded-[inherit] object-cover duration-[inherit] group-hover:scale-100"
        src={imgSrc}
        alt={name}
      />
      <div className="top-full flex flex-col items-center text-center">
        <h4 className="text-lg">{name}</h4>
        <p className="absolute -translate-y-full opacity-0 duration-500 group-hover:translate-y-10 group-hover:opacity-100">
          {text}
        </p>
      </div>
    </div>
  );
}
