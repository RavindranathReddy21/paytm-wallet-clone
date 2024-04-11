const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
let router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
module.exports = router;
