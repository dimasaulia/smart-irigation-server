const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const MIN_TIME = 1;

module.exports.socketConnections = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("disconnect", () => {
            console.log("A client disconnected");
        });
    });
};

module.exports.socketRecord = (io) => {
    io.on("connection", (socket) => {
        socket.on("record", async (data) => {
            console.log(data);

            const { waterDepth, waterFlow, soilHumidity, snsn } = data;

            const {
                gatewayId,
                id: snid,
                sensorHeight,
            } = await prisma.sensorNode.findUnique({
                where: { shortName: String(snsn) },
                select: {
                    gatewayId: true,
                    id: true,
                    sensorHeight: true,
                },
            });

            axios
                .post(
                    "https://smartirigation.herokuapp.com/api/v1/sensor/record/update?snsn=201",
                    {
                        waterDepth: sensorHeight - waterDepth,
                        waterFlow,
                        soilHumidity,
                    }
                )
                .catch(function (error) {
                    console.log(error);
                });

            const last_data = await prisma.sensorNodeDataRecord.findFirst({
                orderBy: {
                    id: "desc",
                },
            });

            if (last_data === null) {
                await prisma.sensorNodeDataRecord.create({
                    data: {
                        waterDepth: String(sensorHeight - waterDepth),
                        waterFlow: String(waterFlow),
                        soilHumidity: String(soilHumidity),
                        sensorNodeId: String(snid),
                    },
                });
                socket.emit("recordSuccess", "Berhasil Menyimpan data");
            }

            if (last_data !== null) {
                const timeDiff = (Date.now() - last_data.createdAt) / 1000 / 60;
                if (timeDiff >= MIN_TIME) {
                    await prisma.sensorNodeDataRecord.create({
                        data: {
                            waterDepth: String(sensorHeight - waterDepth),
                            waterFlow: String(waterFlow),
                            soilHumidity: String(soilHumidity),
                            sensorNodeId: String(snid),
                        },
                    });
                    socket.emit("recordSuccess", "Berhasil Menyimpan data");
                } else {
                    socket.emit("recordSuccess", "Berhasil Mengupdate data");
                }
            }
        });
    });
};
