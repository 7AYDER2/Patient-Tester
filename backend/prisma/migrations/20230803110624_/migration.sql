/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Patient_name_key" ON "Patient"("name");
