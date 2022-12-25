/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "Password" (
    "password" TEXT NOT NULL,
    "userName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Password_userName_key" ON "Password"("userName");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("name") ON DELETE CASCADE ON UPDATE CASCADE;
