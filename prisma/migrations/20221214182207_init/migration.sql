/*
  Warnings:

  - You are about to drop the `RSVP` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RSVP" DROP CONSTRAINT "RSVP_attenderName_fkey";

-- DropForeignKey
ALTER TABLE "RSVP" DROP CONSTRAINT "RSVP_submitterName_fkey";

-- DropTable
DROP TABLE "RSVP";

-- CreateTable
CREATE TABLE "Rsvp" (
    "attend" "Attend" NOT NULL,
    "attenderName" TEXT NOT NULL,
    "submitterName" TEXT NOT NULL,
    "allergies" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Rsvp_attenderName_key" ON "Rsvp"("attenderName");

-- CreateIndex
CREATE UNIQUE INDEX "Rsvp_submitterName_key" ON "Rsvp"("submitterName");

-- AddForeignKey
ALTER TABLE "Rsvp" ADD CONSTRAINT "Rsvp_submitterName_fkey" FOREIGN KEY ("submitterName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rsvp" ADD CONSTRAINT "Rsvp_attenderName_fkey" FOREIGN KEY ("attenderName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
