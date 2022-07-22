const { PrismaClient } = require("@prisma/client");
const { urlPayloadFind } = require("../services/payloadDataGetter");
const prisma = new PrismaClient();
const { resError, resSuccess } = require("../services/responseHandler");
const {
    generateApiKey,
    generateEncryptionKey,
} = require("../services/stringGenerator");

exports.list = async (req, res) => {
    try {
        const data = await prisma.gateway.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return resSuccess({
            res,
            title: "Successfully Listed Gateway Node",
            data,
        });
    } catch (errors) {
        return resError({ res, errors });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, location, transmitFrequency, receiverFrequency } =
            req.body;
        const gateway = await prisma.gateway.create({
            data: {
                name,
                location,
                apiKey: generateApiKey(8),
                encryptionKey: generateEncryptionKey(4),
                transmitFrequency: Number(transmitFrequency),
                receiverFrequency: Number(receiverFrequency),
            },
        });
        return resSuccess({
            res,
            title: "Successfully Create Gateway",
            data: gateway,
        });
    } catch (errors) {
        return resError({ res, errors });
    }
};

exports.detail = async (req, res) => {
    try {
        const gwid = urlPayloadFind(req, "gwid");
        console.log(gwid);
        const data = await prisma.gateway.findUnique({
            where: {
                id: gwid,
            },
        });

        return resSuccess({ res, title: "Gateway Detail", data });
    } catch (errors) {
        return resError({ res, errors });
    }
};

exports.update = async (req, res) => {
    try {
        const gwid = urlPayloadFind(req, "gwid");
        const { name, location, transmitFrequency, receiverFrequency } =
            req.body;
        const gateway = await prisma.gateway.update({
            where: {
                id: gwid,
            },

            data: {
                name,
                location,
                transmitFrequency: Number(transmitFrequency),
                receiverFrequency: Number(receiverFrequency),
            },
        });

        return resSuccess({
            res,
            title: "Success update gateway",
            data: gateway,
        });
    } catch (errors) {
        return resError({ res, errors });
    }
};

exports.updateOnline = async (req, res) => {
    try {
        const gwid = urlPayloadFind(req, "gwid");
        req.app.io.emit(`gateway-id-${gwid}`, req.body.time);
        const gateway = await prisma.gateway.update({
            where: {
                id: gwid,
            },

            data: {
                onlineTimeStamp: new Date(req.body.time),
            },
        });
        return resSuccess({ res, data: gateway });
    } catch (errors) {
        return resError({ res, errors });
    }
};

exports.getLastOnlineTime = async (req, res) => {
    try {
        const gwid = urlPayloadFind(req, "gwid");
        const lastOnlineTime = await prisma.gateway.findUnique({
            where: {
                id: gwid,
            },
            select: {
                onlineTimeStamp: true,
            },
        });
        return resSuccess({ res, data: lastOnlineTime });
    } catch (errors) {
        return resError({ res, errors });
    }
};

exports.search = async (req, res) => {
    const searchArg = urlPayloadFind(req, "term");
    const results = [];
    const searchResult = await prisma.gateway.findMany({
        where: {
            name: {
                contains: searchArg,
                mode: "insensitive",
            },
        },
        select: {
            name: true,
            id: true,
        },
    });

    searchResult.forEach((data) => {
        let { name, id } = data;
        results.push({ value: id, label: name });
    });

    res.status(200).json(results);
};
