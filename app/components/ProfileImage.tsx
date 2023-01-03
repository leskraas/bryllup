import type { ImgHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

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
      alt={""}
      aria-label={name}
      className={twMerge("h-7 w-7 rounded-full object-cover", className)}
      {...rest}
    />
  );
}
