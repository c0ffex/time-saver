/*
  Warnings:

  - You are about to drop the `Costumer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Costumer" DROP CONSTRAINT "Costumer_scheduleId_fkey";

-- DropTable
DROP TABLE "Costumer";

-- DropTable
DROP TABLE "Schedule";

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "usedTime" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_scheduleId_key" ON "Customer"("scheduleId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
