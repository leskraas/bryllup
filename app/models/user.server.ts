import type { Password, User } from "@prisma/client";
// import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      rsvps: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function getAllUsersSimple() {
  return prisma.user.findMany({
    select: { name: true, imgSrc: true },
    orderBy: { name: "asc" },
  });
}

export async function getAllUsers() {
  return prisma.user.findMany({
    include: {
      rsvps: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getAllUsersRsvpPassword() {
  return prisma.user.findMany({
    orderBy: {
      password: {
        password: "asc",
      },
    },
    include: {
      password: true,
      rsvps: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function getAllUsersAll() {
  return prisma.user.findMany();
}

export async function getUserByName(name: User["name"]) {
  return prisma.user.findUnique({ where: { name } });
}

export async function createUser(
  user: Omit<User, "id">,
  password: Password["password"]
) {
  return prisma.user.create({
    data: {
      ...user,
      password: {
        create: {
          password,
        },
      },
    },
  });
}

export async function updateUser(
  { id, ...userData }: User,
  password: Password["password"]
) {
  return prisma.user.update({
    data: {
      ...userData,
      password: {
        upsert: {
          create: {
            password,
          },
          update: {
            password,
          },
        },
      },
    },
    where: {
      id: id,
    },
  });
}

export async function deleteUserById(id: User["id"]) {
  return prisma.user.delete({ where: { id } });
}

export async function verifyLogin(
  name: User["name"],
  password: Password["password"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { name },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || userWithPassword.password?.password !== password) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
