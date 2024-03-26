/*
  Warnings:

  - The `hour` column on the `Availability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minute` column on the `Availability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `weekDay` on the `Availability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "weekDay",
ADD COLUMN     "weekDay" INTEGER NOT NULL,
DROP COLUMN "hour",
ADD COLUMN     "hour" INTEGER[],
DROP COLUMN "minute",
ADD COLUMN     "minute" INTEGER[];
