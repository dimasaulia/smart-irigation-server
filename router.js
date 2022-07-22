const express = require("express");
const router = express.Router();

const { setUser } = require("./middlewares/authMiddlewares");
const GATEWAY = require("./app_gateway/router");
const INTERFACE = require("./app_interface/router");
const AUTH = require("./app_auth/router");

router.get("/", (req, res) => {
    res.redirect("/dashboard/manage");
});
router.get("*", setUser);
router.use("/dashboard", INTERFACE);
router.use("/api/v1/gateway", GATEWAY);
router.use("/api/v1/auth", AUTH);

module.exports = router;
