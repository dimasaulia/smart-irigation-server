const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/authMiddlewares");
const { formChacker } = require("../middlewares/formMiddleware");
const { body, query: urlQuery } = require("express-validator");
const { gatewayIsExist } = require("../middlewares/gatewayMiddlewares");
const sensorController = require("./sensorNodeControllers");

router.get("/list", authMiddlewares.loginRequired, sensorController.list);
router.post(
    "/create",
    authMiddlewares.loginRequired,
    authMiddlewares.allowedRole("ADMIN"),
    body("name").notEmpty(),
    body("sensorHeight").notEmpty(),
    body("shortName").isLength({ min: "4", max: "4" }),
    body("location").notEmpty(),
    urlQuery("gwid").notEmpty(),
    formChacker,
    gatewayIsExist,
    sensorController.create
);
module.exports = router;
