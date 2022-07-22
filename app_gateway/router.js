const express = require("express");
const router = express.Router();
const controllers = require("./controllers");
const authMiddlewares = require("../middlewares/authMiddlewares");
const { formChacker } = require("../middlewares/formMiddleware");
const { body } = require("express-validator");
router.get(
    "/list",
    authMiddlewares.loginRequired,
    authMiddlewares.allowedRole("ADMIN"),
    controllers.list
);
router.get("/detail/:id", controllers.detail);
router.post("/update/:id", controllers.update);
router.post(
    "/create",
    authMiddlewares.loginRequired,
    authMiddlewares.allowedRole("ADMIN"),
    body("name").notEmpty(),
    body("location").notEmpty(),
    body("transmitFrequency").notEmpty().isLength({ min: "4", max: "4" }),
    body("receiverFrequency").notEmpty().isLength({ min: "4", max: "4" }),
    formChacker,
    controllers.create
);
router.post("/update-online-status/:id", controllers.updateOnline);
router.get("/get-last-online-time/:id", controllers.getLastOnlineTime);

module.exports = router;
