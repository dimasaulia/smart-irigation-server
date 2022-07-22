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

module.exports.detail = async (req, res) => {
    try {
        const snid = urlPayloadFind(req, "snid");
        const data = await prisma.sensorNode.findUnique({
            where: {
                id: snid,
            },
        });

        return resSuccess({ res, title: "Sensor Node Detail", data });
    } catch (errors) {
        return resError({ res, errors });
    }
};

module.exports.update = async (req, res) => {
    try {
        const { name, sensorHeight, location, shortName, gwid } = req.body;
        const snid = urlPayloadFind(req, "snid");

        const { receiverFrequency, transmitFrequency } =
            await prisma.gateway.findUnique({
                where: {
                    id: gwid,
                },
            });

        const data = await prisma.sensorNode.update({
            where: {
                id: snid,
            },
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
            },
        });

        return resSuccess({ res, title: "Sensor Node Detail", data });
    } catch (errors) {
        return resError({ res, errors });
    }
};
