/*
  Warnings:

  - The `allergies` column on the `Rsvp` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Rsvp" DROP COLUMN "allergies",
ADD COLUMN     "allergies" TEXT[];
