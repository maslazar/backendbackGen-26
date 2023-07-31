const express = require("express");
const router = express.Router();

//Controllers
const userController = require("../controllers/user.controller");

//Post /signup Esta petición creará una cuenta nueva para el usuario
//Post /login El usuario ingresa su numero de cuenta y contraseña
//Get /:id/history Obtine todas las transferencias hechas por el usuario en sesión

router.post("/signup", userController.createAccount);
router.post("/login", userController.loginUser);
router.get("/:id/history", userController.getAllTransferHistory);

module.exports = router;
