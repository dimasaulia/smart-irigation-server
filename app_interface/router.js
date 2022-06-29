const express = require("express");
const router = express.Router();
const manage = require("./manage/router");
const gateway = require("./gateway/router");

router.use("/manage", manage);
router.use("/gateway", gateway);

module.exports = router;
