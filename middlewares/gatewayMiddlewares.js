const { PrismaClient } = require("@prisma/client");
const {
    urlPayloadFind,
    payloadFind,
} = require("../services/payloadDataGetter");
const prisma = new PrismaClient();
const { resError, ErrorException } = require("../services/responseHandler");

const gatewayIsExist = async (req, res, next) => {
    const gwid = payloadFind(req, "gwid");
    console.log("GWID ", gwid);
    try {
        const gateway = await prisma.gateway.findUnique({
            where: {
                id: gwid,
            },
        });

        // give response if cant find the user
        if (gateway === null)
            throw new ErrorException({
                type: "gateway",
                detail: "Cant find the gateway",
                location: "Gateway Midlleware",
            });

        return next();
    } catch (errors) {
        return resError({ res, title: "Something Wrong", errors });
    }
};

module.exports = { gatewayIsExist };
