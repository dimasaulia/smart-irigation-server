const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const gatewayIsExist = async (req, res, next) => {
    const { gwid } = req.querys || req.params || req.body;
    try {
        const { username } = req.body;
        const gateway = await prisma.user.findUnique({
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
