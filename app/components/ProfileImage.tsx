import clsx from "clsx";
import type { ImgHTMLAttributes } from "react";

type ProfileImageProps = {
  name: string;
  imgSrc: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export function ProfileImage({
  imgSrc,
  name,
  className,
  ...rest
}: ProfileImageProps): JSX.Element {
  return (
    <img
      src={imgSrc}
      alt={name}
      className={clsx("h-5 w-5 rounded-full object-cover", className)}
      {...rest}
    />
  );
}
