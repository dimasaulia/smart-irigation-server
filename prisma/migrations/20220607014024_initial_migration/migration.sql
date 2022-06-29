-- CreateTable
CREATE TABLE "Gateway" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "encryptionKey" TEXT NOT NULL,
    "transmitFrequency" INTEGER NOT NULL,
    "receiverFrequency" INTEGER NOT NULL,
    "onlineTimeStamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gateway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorNode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "sensorHeight" INTEGER NOT NULL,
    "transistorMapingMin" INTEGER NOT NULL,
    "transistorMapingMax" INTEGER NOT NULL,
    "sluiceGateOpenMax" INTEGER NOT NULL,
    "sluiceGateOpenMin" INTEGER NOT NULL,
    "transmitFrequency" INTEGER NOT NULL,
    "receiverFrequency" INTEGER NOT NULL,
    "onlineTimeStamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gatewayId" INTEGER NOT NULL,

    CONSTRAINT "SensorNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorNodeDataRecord" (
    "id" SERIAL NOT NULL,
    "waterDepth" INTEGER NOT NULL,
    "waterFlow" INTEGER NOT NULL,
    "soilHumidity" INTEGER NOT NULL,
    "transistorValue" INTEGER NOT NULL,
    "recordTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sensorNodeId" INTEGER NOT NULL,

    CONSTRAINT "SensorNodeDataRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorNodeInstruction" (
    "id" SERIAL NOT NULL,
    "sluiceGateOpening" INTEGER NOT NULL DEFAULT 0,
    "sluiceGateOpeningDuration" INTEGER NOT NULL DEFAULT 0,
    "sluiceGateSchedule" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sensorNodeId" INTEGER NOT NULL,

    CONSTRAINT "SensorNodeInstruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportNode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "transmitFrequency" INTEGER NOT NULL,
    "onlineTimeStamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sensorNodeId" INTEGER NOT NULL,

    CONSTRAINT "SupportNode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SensorNodeInstruction_sensorNodeId_key" ON "SensorNodeInstruction"("sensorNodeId");

-- CreateIndex
CREATE UNIQUE INDEX "SupportNode_sensorNodeId_key" ON "SupportNode"("sensorNodeId");

-- AddForeignKey
ALTER TABLE "SensorNode" ADD CONSTRAINT "SensorNode_gatewayId_fkey" FOREIGN KEY ("gatewayId") REFERENCES "Gateway"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorNodeDataRecord" ADD CONSTRAINT "SensorNodeDataRecord_sensorNodeId_fkey" FOREIGN KEY ("sensorNodeId") REFERENCES "SensorNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorNodeInstruction" ADD CONSTRAINT "SensorNodeInstruction_sensorNodeId_fkey" FOREIGN KEY ("sensorNodeId") REFERENCES "SensorNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportNode" ADD CONSTRAINT "SupportNode_sensorNodeId_fkey" FOREIGN KEY ("sensorNodeId") REFERENCES "SensorNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
