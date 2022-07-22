const { PrismaClient } = require("@prisma/client");
const { urlPayloadFind } = require("../services/payloadDataGetter");
const prisma = new PrismaClient();
const { resError, resSuccess } = require("../services/responseHandler");

module.exports.list = async (req, res) => {
    try {
        const sensorNodeList = await prisma.sensorNode.findMany({
            orderBy: {
                name: "asc",
            },
        });
        return resSuccess({ res, data: sensorNodeList });
    } catch (error) {
        return resError({ res, errors: error });
    }
};

module.exports.create = async (req, res) => {
    try {
        const gwid = urlPayloadFind(req, "gwid");
        const { name, sensorHeight, location, shortName } = req.body;

        const { receiverFrequency, transmitFrequency } =
            await prisma.gateway.findUnique({
                where: {
                    id: gwid,
                },
            });

        const sensorNode = await prisma.sensorNode.create({
            data: {
                name,
                sensorHeight,
                location,
                shortName,
                transmitFrequency: receiverFrequency,
                receiverFrequency: transmitFrequency,
                gateway: {
                    connect: {
                        id: gwid,
                    },
                },
                instruction: {
                    create: {
                        sluiceGateOpening: 0,
                        sluiceGateOpeningDuration: 0,
                        sluiceGateSchedule: null,
                    },
                },
            },
        });
        return resSuccess({ res, data: sensorNode });
    } catch (error) {
        console.log(error);
        return resError({ res, errors: error });
    }
};
