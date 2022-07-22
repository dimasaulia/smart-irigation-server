/*
  Warnings:

  - The primary key for the `Profil` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SensorNodeInstruction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Profil" DROP CONSTRAINT "Profil_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profil_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profil_id_seq";

-- AlterTable
ALTER TABLE "SensorNodeInstruction" DROP CONSTRAINT "SensorNodeInstruction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SensorNodeInstruction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SensorNodeInstruction_id_seq";
