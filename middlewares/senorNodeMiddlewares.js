const { PrismaClient } = require("@prisma/client");
const { urlPayloadFind } = require("../services/payloadDataGetter");
const prisma = new PrismaClient();
const { resError, ErrorException } = require("../services/responseHandler");

const sensorNodeIsExist = async (req, res, next) => {
    const snid = urlPayloadFind(req, "snid");
    try {
        const sensor = await prisma.sensorNode.findUnique({
            where: {
                id: snid,
            },
        });

        // give response if cant find the user
        if (sensor === null)
            throw new ErrorException({
                type: "sensorNode",
                detail: "Cant find the sensor node",
                location: "Sensor Node Midlleware",
            });

        return next();
    } catch (errors) {
        return resError({ res, title: "Something Wrong", errors });
    }
};

module.exports = { sensorNodeIsExist };
