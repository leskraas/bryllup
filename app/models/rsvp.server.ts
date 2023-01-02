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
  ...rest
}: Rsvp) {
  //   console.log({ attend, allergies, submitterName, attenderName });

  return prisma.user.update({
    data: {
      rsvp: {
        upsert: {
          create: {
            ...rest,
            submitter: {
              connect: {
                name: submitterName,
              },
            },
          },
          update: {
            ...rest,
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
