/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Password` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Attend" AS ENUM ('YES', 'NO', 'SATURDAY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "updatedAt",
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST';

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "Password";

-- CreateTable
CREATE TABLE "RSVP" (
    "attend" "Attend" NOT NULL,
    "attenderName" TEXT NOT NULL,
    "submitterName" TEXT NOT NULL,
    "allergies" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RSVP_attenderName_key" ON "RSVP"("attenderName");

-- CreateIndex
CREATE UNIQUE INDEX "RSVP_submitterName_key" ON "RSVP"("submitterName");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "RSVP" ADD CONSTRAINT "RSVP_submitterName_fkey" FOREIGN KEY ("submitterName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RSVP" ADD CONSTRAINT "RSVP_attenderName_fkey" FOREIGN KEY ("attenderName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
