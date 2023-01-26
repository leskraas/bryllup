/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Rsvp` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Rsvp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rsvp" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
