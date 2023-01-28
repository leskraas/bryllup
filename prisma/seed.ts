import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const name = "Lars Erik Skraastad";
  const name_2 = "Torjus Hansen Sæthre";
  const img =
    "https://scontent.fsvg2-1.fna.fbcdn.net/v/t1.6435-9/59079201_10216432838106761_4525797272486674432_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g-iQB-7MDc8AX9Qzhhv&_nc_oc=AQmScEwZuYbVRDYPoTsizw7Q00ABVynkwbrbT1ZHspVvi6eCJ4JafVD12BWNUBiArNvYXJDbNyAbXBQChoySD6Zb&_nc_ht=scontent.fsvg2-1.fna&oh=00_AfCmqmJey7p8oR61zMCySHSuL6_ZwXdowXBeg09km9vWbQ&oe=63CD4CF7";
  const img_2 =
    "https://scontent.fsvg2-1.fna.fbcdn.net/v/t31.18172-8/26173821_10156011514290979_7245404641221277127_o.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bD87us1Vw3EAX8Vuj1n&_nc_ht=scontent.fsvg2-1.fna&oh=00_AfBg3gcAW2dm98hyvlolp8M5U25_-WJh0ZtLAxi7hawLWQ&oe=63CD47E8";

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
