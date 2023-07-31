const express = require("express");
const router = express.Router();

//Controladores
const transferController = require("../controllers/transfer.controller");

router.post("/", transferController.accountTransfer);

module.exports = router;
