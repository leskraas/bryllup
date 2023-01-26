-- CreateEnum
CREATE TYPE "Attend" AS ENUM ('YES', 'NO', 'SATURDAY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgSrc" TEXT,
    "role" "Role" NOT NULL DEFAULT 'GUEST',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "password" TEXT NOT NULL,
    "userName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rsvp" (
    "attend" "Attend" NOT NULL,
    "attenderName" TEXT NOT NULL,
    "submitterName" TEXT NOT NULL,
    "allergies" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userName_key" ON "Password"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Rsvp_attenderName_key" ON "Rsvp"("attenderName");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rsvp" ADD CONSTRAINT "Rsvp_submitterName_fkey" FOREIGN KEY ("submitterName") REFERENCES "User"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rsvp" ADD CONSTRAINT "Rsvp_attenderName_fkey" FOREIGN KEY ("attenderName") REFERENCES "User"("name") ON DELETE CASCADE ON UPDATE CASCADE;
