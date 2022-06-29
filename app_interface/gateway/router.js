const express = require("express");
const router = express.Router();
const gateway = require("./gatewayControllers");

router.get("/list", gateway.list);
router.get("/create", gateway.create);

module.exports = router;
