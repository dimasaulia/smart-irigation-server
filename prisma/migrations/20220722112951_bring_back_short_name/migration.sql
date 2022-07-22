/*
  Warnings:

  - A unique constraint covering the columns `[shortName]` on the table `SensorNode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortName` to the `SensorNode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SensorNode" ADD COLUMN     "shortName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SensorNode_shortName_key" ON "SensorNode"("shortName");
