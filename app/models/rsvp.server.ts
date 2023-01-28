import type { Prisma, User } from "@prisma/client";
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
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllRsvp() {
  const allUserAndRsvp = await prisma.user.findMany({
    select: {
      imgSrc: true,
      name: true,
      rsvps: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          attend: true,
          id: true,
        },
        take: 1,
      },
      id: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return allUserAndRsvp.map((user) => ({
    ...user,
    rsvp: user.rsvps.length ? user.rsvps[0] : null,
  }));
}

export async function createRsvp({
  submitterName,
  attenderName,
  ...rest
}: Omit<Prisma.RsvpCreateArgs["data"], "submitter" | "attender">) {
  return prisma.rsvp.create({
    data: {
      ...rest,
      submitter: {
        connect: {
          name: submitterName,
        },
      },
      attender: {
        connect: {
          name: attenderName,
        },
      },
    },
  });
  // return prisma.user.update({
  //   data: {
  //     rsvp: {
  //       upsert: {
  //         create: {
  //           ...rest,
  //           submitter: {
  //             connect: {
  //               name: submitterName,
  //             },
  //           },
  //         },
  //         update: {
  //           ...rest,
  //           submitter: {
  //             connect: {
  //               name: submitterName,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   where: {
  //     name: attenderName,
  //   },
  // });
}

export async function deleteAllRsvp() {
  return prisma.rsvp.deleteMany();
}
