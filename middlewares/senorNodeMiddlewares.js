const { PrismaClient } = require("@prisma/client");
const { urlPayloadFind } = require("../services/payloadDataGetter");
const prisma = new PrismaClient();
const { resError, ErrorException } = require("../services/responseHandler");

const sensorNodeIsExist = async (req, res, next) => {
    const snid = urlPayloadFind(req, "snid"); //ssn for sensor node short name
    const snsn = urlPayloadFind(req, "snsn");
    console.log("SNSN ", snsn);
    try {
        if (snid) {
            const sensor = await prisma.sensorNode.findUnique({
                where: {
                    id: snid,
                },
            });

            // give response if cant find the user
            if (sensor === null)
                throw new ErrorException({
                    type: "sensorNode",
                    detail: "Cant find the sensor node id",
                    location: "Sensor Node Midlleware",
                });
        }

        if (snsn) {
            const sensor = await prisma.sensorNode.findUnique({
                where: {
                    shortName: snsn,
                },
            });

            // give response if cant find the user
            if (sensor === null)
                throw new ErrorException({
                    type: "sensorNode",
                    detail: "Cant find the sensor node short name",
                    location: "Sensor Node Midlleware",
                });
        }

        return next();
    } catch (errors) {
        return resError({ res, title: "Something Wrong", errors });
    }
};

module.exports = { sensorNodeIsExist };
