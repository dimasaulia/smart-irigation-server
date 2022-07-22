/*
  Warnings:

  - The primary key for the `Gateway` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SensorNode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sluiceGateOpenMax` on the `SensorNode` table. All the data in the column will be lost.
  - You are about to drop the column `sluiceGateOpenMin` on the `SensorNode` table. All the data in the column will be lost.
  - You are about to drop the column `transistorMapingMax` on the `SensorNode` table. All the data in the column will be lost.
  - You are about to drop the column `transistorMapingMin` on the `SensorNode` table. All the data in the column will be lost.
  - The primary key for the `SensorNodeDataRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recordTime` on the `SensorNodeDataRecord` table. All the data in the column will be lost.
  - You are about to drop the column `transistorValue` on the `SensorNodeDataRecord` table. All the data in the column will be lost.
  - The primary key for the `SupportNode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `onlineTimeStamp` on the `SupportNode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortName]` on the table `SensorNode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortName` to the `SensorNode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SensorNode" DROP CONSTRAINT "SensorNode_gatewayId_fkey";

-- DropForeignKey
ALTER TABLE "SensorNodeDataRecord" DROP CONSTRAINT "SensorNodeDataRecord_sensorNodeId_fkey";

-- DropForeignKey
ALTER TABLE "SensorNodeInstruction" DROP CONSTRAINT "SensorNodeInstruction_sensorNodeId_fkey";

-- DropForeignKey
ALTER TABLE "SupportNode" DROP CONSTRAINT "SupportNode_sensorNodeId_fkey";

-- AlterTable
ALTER TABLE "Gateway" DROP CONSTRAINT "Gateway_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Gateway_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Gateway_id_seq";

-- AlterTable
ALTER TABLE "SensorNode" DROP CONSTRAINT "SensorNode_pkey",
DROP COLUMN "sluiceGateOpenMax",
DROP COLUMN "sluiceGateOpenMin",
DROP COLUMN "transistorMapingMax",
DROP COLUMN "transistorMapingMin",
ADD COLUMN     "shortName" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "gatewayId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SensorNode_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SensorNode_id_seq";

-- AlterTable
ALTER TABLE "SensorNodeDataRecord" DROP CONSTRAINT "SensorNodeDataRecord_pkey",
DROP COLUMN "recordTime",
DROP COLUMN "transistorValue",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sensorNodeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SensorNodeDataRecord_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SensorNodeDataRecord_id_seq";

-- AlterTable
ALTER TABLE "SensorNodeInstruction" ALTER COLUMN "sluiceGateOpening" DROP NOT NULL,
ALTER COLUMN "sluiceGateOpeningDuration" DROP NOT NULL,
ALTER COLUMN "sluiceGateSchedule" DROP NOT NULL,
ALTER COLUMN "sensorNodeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SupportNode" DROP CONSTRAINT "SupportNode_pkey",
DROP COLUMN "onlineTimeStamp",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sensorNodeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SupportNode_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SupportNode_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "SensorNode_shortName_key" ON "SensorNode"("shortName");

-- AddForeignKey
ALTER TABLE "SensorNode" ADD CONSTRAINT "SensorNode_gatewayId_fkey" FOREIGN KEY ("gatewayId") REFERENCES "Gateway"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorNodeDataRecord" ADD CONSTRAINT "SensorNodeDataRecord_sensorNodeId_fkey" FOREIGN KEY ("sensorNodeId") REFERENCES "SensorNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorNodeInstruction" ADD CONSTRAINT "SensorNodeInstruction_sensorNodeId_fkey" FOREIGN KEY ("sensorNodeId") REFERENCES "SensorNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportNode" ADD CONSTRAINT "SupportNode_sensorNodeId_fkey" FOREIGN KEY ("sensorNodeId") REFERENCES "SensorNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
