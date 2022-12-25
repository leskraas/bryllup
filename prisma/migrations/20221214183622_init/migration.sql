-- DropForeignKey
ALTER TABLE "Rsvp" DROP CONSTRAINT "Rsvp_attenderName_fkey";

-- DropForeignKey
ALTER TABLE "Rsvp" DROP CONSTRAINT "Rsvp_submitterName_fkey";

-- AddForeignKey
ALTER TABLE "Rsvp" ADD CONSTRAINT "Rsvp_submitterName_fkey" FOREIGN KEY ("submitterName") REFERENCES "User"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rsvp" ADD CONSTRAINT "Rsvp_attenderName_fkey" FOREIGN KEY ("attenderName") REFERENCES "User"("name") ON DELETE CASCADE ON UPDATE CASCADE;
