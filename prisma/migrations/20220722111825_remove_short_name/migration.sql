/*
  Warnings:

  - You are about to drop the column `shortName` on the `SensorNode` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SensorNode_shortName_key";

-- AlterTable
ALTER TABLE "SensorNode" DROP COLUMN "shortName";
