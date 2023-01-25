import type { ImgHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { getImageUrl } from "~/utils/getImageUrl";

type ProfileImageProps = {
  name: string;
  fileName: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

export function ProfileImage({
  fileName,
  name,
  className,
  ...rest
}: ProfileImageProps): JSX.Element {
  return (
    <img
      src={getImageUrl(fileName, { width: 50, height: 50 })}
      alt={""}
      width="50"
      height="50"
      aria-label={name}
      className={twMerge("h-7 w-7 rounded-full object-cover", className)}
      {...rest}
    />
  );
}
