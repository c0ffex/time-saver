/*
  Warnings:

  - You are about to drop the column `date` on the `Availability` table. All the data in the column will be lost.
  - The `hour` column on the `Availability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minute` column on the `Availability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `weekDay` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "date",
ADD COLUMN     "weekDay" TEXT NOT NULL,
DROP COLUMN "hour",
ADD COLUMN     "hour" TEXT[],
DROP COLUMN "minute",
ADD COLUMN     "minute" TEXT[];
