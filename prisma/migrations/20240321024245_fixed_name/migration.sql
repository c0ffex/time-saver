/*
  Warnings:

  - You are about to drop the column `profilePictre` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePictre",
ADD COLUMN     "profilePicture" TEXT;
