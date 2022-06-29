const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.manage = (req, res) => {
    res.render("index");
};
