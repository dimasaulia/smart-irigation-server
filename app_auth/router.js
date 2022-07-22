const express = require("express");
const router = express.Router();
const authControllers = require("./authControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");
const { formChacker } = require("../middlewares/formMiddleware");
const { body } = require("express-validator");

router.post(
    "/register",
    authMiddlewares.logoutRequired,
    body("username").notEmpty(),
    body("email").isEmail().trim(),
    body("password").isLength({ min: "8" }),
    formChacker,
    authMiddlewares.defaultRoleIsExist,
    authMiddlewares.userIsNotExist,
    authControllers.register
);
router.post(
    "/login",
    body("username").notEmpty(),
    body("password").isLength({ min: "8" }),
    formChacker,
    authMiddlewares.defaultRoleIsExist,
    authMiddlewares.userIsExist,
    authControllers.login
);
router.get("/logout", authMiddlewares.loginRequired, authControllers.logout);

module.exports = router;
