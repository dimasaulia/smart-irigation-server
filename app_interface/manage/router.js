const express = require("express");
const router = express.Router();
const controllers = require("./dashboardControllers");

router.get("/", controllers.manage);

module.exports = router;
