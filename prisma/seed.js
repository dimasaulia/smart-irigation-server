const { PrismaClient } = require("@prisma/client");
const { gateway } = require("./gateway");
const prisma = new PrismaClient();

async function main() {
    for (let g of gateway) {
        await prisma.gateway.create({
            data: g,
        });
    }
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
