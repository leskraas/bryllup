import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const name = "Lars Erik Skraastad";
  const name_2 = "Torjus Hansen Sæthre";
  const img = "larserik.jpeg";
  const img_2 = "torjus.jpeg";

  // cleanup the existing database
  await prisma.user.delete({ where: { name } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.user.delete({ where: { name: name_2 } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  // const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      name,
      imgSrc: img,
      password: {
        create: {
          password: "passord",
        },
      },
      role: "ADMIN",
    },
  });

  const user_2 = await prisma.user.create({
    data: {
      name: name_2,
      imgSrc: img_2,
      password: {
        create: {
          password: "passord",
        },
      },
      role: "ADMIN",
    },
  });

  await prisma.rsvp.create({
    data: {
      attend: "YES",
      attender: {
        connect: {
          name: user.name,
        },
      },
      submitter: {
        connect: {
          name: user.name,
        },
      },
    },
  });
  await prisma.rsvp.create({
    data: {
      attend: "YES",
      attender: {
        connect: {
          name: user_2.name,
        },
      },
      submitter: {
        connect: {
          name: user.name,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
