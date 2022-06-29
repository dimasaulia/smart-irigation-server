const express = require("express");
const router = express.Router();

const GATEWAY = require("./app_gateway/router");
const INTERFACE = require("./app_interface/router");

router.get("/", (req, res) => {
    res.redirect("/dashboard/manage");
});
router.use("/dashboard", INTERFACE);
router.use("/api/gateway", GATEWAY);

module.exports = router;
