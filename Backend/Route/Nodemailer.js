const express = require("express");
const { sendMail } = require("../Controller/mail");
const router = express.Router();

router.post("/",sendMail)

module.exports = router