const express = require("express");
const router = express.Router();
const sensor = require("./sensorControllers");

router.get("/detail", sensor.detail);

module.exports = router;
