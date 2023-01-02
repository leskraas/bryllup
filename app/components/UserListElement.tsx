import type { User } from "@prisma/client";
import { ProfileImage } from "./ProfileImage";

type UserListElementProps = {
  user: User;
};

export function UserListElement({ user }: UserListElementProps): JSX.Element {
  const { imgSrc, name, role } = user;
  return (
    <p className="relative grid grid-cols-3 justify-items-center gap-2 pl-10">
      {imgSrc && (
        <ProfileImage
          imgSrc={imgSrc}
          name={name}
          className="absolute left-0 top-1/2 h-8 w-8 -translate-y-1/2"
        />
      )}
      <span className="place-self-start font-bold">{name}</span>
      <span>{role}</span>
    </p>
  );
}
