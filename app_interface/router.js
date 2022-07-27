const express = require("express");
const router = express.Router();
const manage = require("./manage/router");
const gateway = require("./gateway/router");
const sensor = require("./sensor/router");

router.use("/manage", manage);
router.use("/gateway", gateway);
router.use("/sensor", sensor);

module.exports = router;
