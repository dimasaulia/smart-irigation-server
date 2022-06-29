const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

router.get("/list", controllers.list);
router.get("/detail/:id", controllers.detail);
router.post("/update/:id", controllers.update);
router.post("/create", controllers.create);
router.post("/update-online-status/:id", controllers.updateOnline);
router.get("/get-last-online-time/:id", controllers.getLastOnlineTime);

module.exports = router;
