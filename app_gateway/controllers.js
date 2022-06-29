const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (req, res) => {
    const data = await prisma.gateway.findMany({
        orderBy: {
            id: "asc",
        },
    });
    res.json(data);
};

exports.create = async (req, res) => {
    const gateway = await prisma.gateway.create({
        data: {
            name: req.body.name,
            location: req.body.location,
            apiKey: req.body.apiKey,
            encryptionKey: req.body.encryptionKey,
            transmitFrequency: Number(req.body.transmitFrequency),
            receiverFrequency: Number(req.body.receiverFrequency),
        },
    });
    res.json(gateway);
};

exports.detail = async (req, res) => {
    const data = await prisma.gateway.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });

    res.json(data);
};

exports.update = async (req, res) => {
    const data = await prisma.gateway.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });

    const gateway = await prisma.gateway.update({
        where: {
            id: Number(req.params.id),
        },

        data: {
            name: req.body.name || data.name,
            location: req.body.location || data.location,
            apiKey: req.body.apiKey || data.apiKey,
            encryptionKey: req.body.encryptionKey || data.encryptionKey,
            transmitFrequency:
                Number(req.body.transmitFrequency) || data.transmitFrequency,
            receiverFrequency:
                Number(req.body.receiverFrequency) || data.receiverFrequency,
        },
    });

    res.json(gateway);
};

exports.updateOnline = async (req, res) => {
    const id = Number(req.params.id);
    req.app.io.emit(`gateway-id-${id}`, req.body.time);
    const gateway = await prisma.gateway.update({
        where: {
            id: id,
        },

        data: {
            onlineTimeStamp: new Date(req.body.time),
        },
    });
    res.status(200).send(gateway);
};

exports.getLastOnlineTime = async (req, res) => {
    const id = Number(req.params.id);
    const lastOnlineTime = await prisma.gateway.findUnique({
        where: {
            id: id,
        },
        select: {
            onlineTimeStamp: true,
        },
    });
    console.log(lastOnlineTime);
    res.send(lastOnlineTime);
};
