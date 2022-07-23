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

module.exports.delete = async (req, res) => {
    try {
        const snid = urlPayloadFind(req, "snid");
        const instruction = await prisma.sensorNodeInstruction.delete({
            where: {
                sensorNodeId: snid,
            },
        });

        const sensorNode = await prisma.sensorNode.delete({
            where: {
                id: snid,
            },
        });

        return resSuccess({
            res,
            title: "Sensor Node Deleted",
            data: { sensorNode, instruction },
        });
    } catch (errors) {
        return resError({ res, errors });
    }
};

module.exports.record = async (req, res) => {
    try {
        // TODO: need update for save data only 5 minutes once
        const snsn = urlPayloadFind(req, "snsn");
        const { gatewayId, id: snid } = await prisma.sensorNode.findUnique({
            where: { shortName: snsn },
            select: {
                gatewayId: true,
                id: true,
            },
        });
        const { waterDepth, waterFlow, soilHumidity } = req.body;
        const record = await prisma.sensorNodeDataRecord.create({
            data: {
                waterDepth,
                waterFlow,
                soilHumidity,
                sensorNodeId: snid,
            },
        });

        req.app.io.emit(`node-id-${snid}`, {
            waterDepth,
            waterFlow,
            soilHumidity,
        });

        const gateway = await prisma.gateway.update({
            where: {
                id: gatewayId,
            },

            data: {
                onlineTimeStamp: new Date(),
            },
        });

        return resSuccess({
            res,
            title: "Record Data Success",
            data: { record, gateway: "Success update online stamp" },
        });
    } catch (error) {
        console.log(error);
        return resError({ res, errors: error });
    }
};

module.exports.recordList = async (req, res) => {
    try {
        const snsn = urlPayloadFind(req, "snsn");
        const sensorRecord = await prisma.sensorNodeDataRecord.findMany({
            where: {
                sensorNode: {
                    shortName: snsn,
                },
            },
        });
        return resSuccess({
            res,
            title: "Success listed sensor record",
            data: sensorRecord,
        });
    } catch (error) {
        console.log(error);
        return resError({ res, errors: error });
    }
};

module.exports.setInstruction = async (req, res) => {
    try {
        const snsn = urlPayloadFind(req, "snsn");
        const { sluiceGateOpening } = req.body;
        const { id: snid } = await prisma.sensorNode.findUnique({
            where: { shortName: snsn },
            select: {
                id: true,
            },
        });
        const instruction = await prisma.sensorNodeInstruction.update({
            where: {
                sensorNodeId: snid,
            },
            data: {
                sluiceGateOpening: Number(sluiceGateOpening),
            },
        });
        return resSuccess({
            res,
            title: "Success update sensor instruction",
            data: instruction,
        });
    } catch (error) {
        return resError({ res, errors: error });
    }
};

module.exports.clearInstruction = async (req, res) => {
    try {
        const snsn = urlPayloadFind(req, "snsn");
        const { id: snid } = await prisma.sensorNode.findUnique({
            where: { shortName: snsn },
            select: {
                id: true,
            },
        });
        const instruction = await prisma.sensorNodeInstruction.update({
            where: {
                sensorNodeId: snid,
            },
            data: {
                sluiceGateOpening: null,
                sluiceGateOpeningDuration: null,
                sluiceGateSchedule: null,
            },
        });
        return resSuccess({
            res,
            title: "Success clear sensor instruction",
            data: instruction,
        });
    } catch (error) {
        return resError({ res, errors: error });
    }
};

module.exports.getOpeningInstruction = async (req, res) => {
    try {
        const snsn = urlPayloadFind(req, "snsn");
        const { id: snid } = await prisma.sensorNode.findUnique({
            where: { shortName: snsn },
            select: {
                id: true,
            },
        });
        const { sluiceGateOpening } =
            await prisma.sensorNodeInstruction.findUnique({
                where: {
                    sensorNodeId: snid,
                },
                select: {
                    sluiceGateOpening: true,
                },
            });
        return res.json({ sluiceGateOpening });
    } catch (error) {
        return resError({ res, errors: error });
    }
};
