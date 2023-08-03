/*
  Warnings:

  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Test` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `results` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `results` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TestToResults" DROP CONSTRAINT "TestToResults_resultId_fkey";

-- DropForeignKey
ALTER TABLE "TestToResults" DROP CONSTRAINT "TestToResults_testId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_patientId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_testId_fkey";

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Patient_id_seq";

-- AlterTable
ALTER TABLE "Test" DROP CONSTRAINT "Test_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Test_id_seq";

-- AlterTable
ALTER TABLE "TestToResults" ALTER COLUMN "testId" SET DATA TYPE TEXT,
ALTER COLUMN "resultId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "results" DROP CONSTRAINT "results_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ALTER COLUMN "testId" SET DATA TYPE TEXT;
DROP SEQUENCE "results_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Patient_id_key" ON "Patient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Test_id_key" ON "Test"("id");

-- CreateIndex
CREATE UNIQUE INDEX "results_id_key" ON "results"("id");

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestToResults" ADD CONSTRAINT "TestToResults_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestToResults" ADD CONSTRAINT "TestToResults_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
