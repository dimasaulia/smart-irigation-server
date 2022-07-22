const crypto = require("crypto");
const { ErrorException } = require("../services/auth");
const generateApiKey = (length) => {
    try {
        if (length < 2) {
            throw ErrorException({
                type: "length",
                detail: "Minimal length to generate string is 2",
                location: "String genartor service",
            });
        }
        const randomString = crypto.randomBytes(length / 2).toString("hex");
        return randomString;
    } catch (error) {
        return error;
    }
};

const generateEncryptionKey = (myLength) => {
    const chars = "1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

module.exports = { generateApiKey, generateEncryptionKey };
