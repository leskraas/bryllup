/*
  Warnings:

  - You are about to drop the column `allergies` on the `Rsvp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rsvp" DROP COLUMN "allergies",
ADD COLUMN     "additionalInfo" TEXT;
