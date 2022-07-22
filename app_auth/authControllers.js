const { PrismaClient } = require("@prisma/client");
const {
    setAuthCookie,
    ErrorException,
    encryptPassword,
    isTruePassword,
} = require("../services/auth");
const { resError, resSuccess } = require("../services/error");
const prisma = new PrismaClient();

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // try find the user
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
                username: true,
                password: true,
                email: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        // give response if password not match
        if (!isTruePassword(password, user.password))
            throw new ErrorException({
                type: "password",
                detail: "Username and password not match",
                location: "Login Process",
            });

        setAuthCookie({ res, uuid: user.id });
        return resSuccess({
            res,
            title: "Berhasil login",
            data: {
                username: user.username,
                email: user.email,
                id: user.id,
                role: user.role.name,
            },
        });
    } catch (err) {
        return resError({ res, title: "Gagal Login", errors: err, code: 401 });
    }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: encryptPassword(password),
                role: {
                    connect: {
                        name: "USER",
                    },
                },
            },
            select: {
                id: true,
                username: true,
                email: true,
                roleId: true,
            },
        });

        setAuthCookie({ res, uuid: newUser.id });
        return resSuccess({ res, title: "Berhasil regsitrasi", data: newUser });
    } catch (error) {
        return resError({
            res,
            title: "Gagal merigistrasi user",
            errors: error,
        });
    }
};

module.exports.logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    return resSuccess({ res, title: "Successfullt logout" });
    // res.redirect("/auth/login");
};
