import type { Rsvp, User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getRsvpById(id: User["id"]) {
  return prisma.rsvp.findMany({
    where: {
      submitter: {
        id,
      },
    },
    include: {
      attender: {
        select: {
          imgSrc: true,
        },
      },
    },
  });
}

export async function getAllRsvp() {
  return prisma.rsvp.findMany({
    select: {
      attender: {
        select: {
          imgSrc: true,
          name: true,
        },
      },
      attend: true,
    },
  });
}

export async function createRsvp({
  submitterName,
  attenderName,
  allergies,
  ...rest
}: Omit<Rsvp, "allergies" | "createdAt" | "updatedAt"> & {
  allergies: string;
}) {
  const previousAllergies = (
    await prisma.user.findFirst({
      where: {
        name: {
          equals: attenderName,
        },
      },
      select: {
        rsvp: {
          select: {
            allergies: true,
          },
        },
      },
    })
  )?.rsvp?.allergies;
  console.log({ previousAllergies });
  const isAllergiesResponseDuplicate = previousAllergies
    ? previousAllergies[previousAllergies.length - 1] === allergies
    : false;

  return prisma.user.update({
    data: {
      rsvp: {
        upsert: {
          create: {
            ...rest,
            allergies,
            submitter: {
              connect: {
                name: submitterName,
              },
            },
          },
          update: {
            ...rest,
            allergies: {
              push: isAllergiesResponseDuplicate ? undefined : allergies,
              set: isAllergiesResponseDuplicate ? previousAllergies : undefined,
            },
            submitter: {
              connect: {
                name: submitterName,
              },
            },
          },
        },
      },
    },
    where: {
      name: attenderName,
    },
  });
}
