/*
  Warnings:

  - The required column `id` was added to the `Rsvp` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Rsvp_attenderName_key";

-- AlterTable
ALTER TABLE "Rsvp" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Rsvp_pkey" PRIMARY KEY ("id");
