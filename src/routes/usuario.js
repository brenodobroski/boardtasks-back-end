const express = require("express");
const conectarBancoDados = require("../middlewares/conectarBD");
const tratarErrosEsperados = require("../functions/tratarErrosEsperados");
const bcrypt = require("bcrypt");
const EsquemaUsuario = require("../models/usuario");
const router = express.Router();

router.post("/criar", conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ["Usuario"]
    let { nome, email, senha } = req.body;
    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaBD = await EsquemaUsuario.create({
      nome,
      email,
      senha: senhaHash,
    });

    res.status(200).json({
      status: "Ok",
      statusMensagem: "Usuario criado com sucesso",
      resposta: respostaBD,
    });
  } catch (error) {
    if (String(error).includes("email_1 dup key")) {
      return tratarErrosEsperados(
        res,
        "Error: Ja existe uma conta com este email"
      );
    }
    return tratarErrosEsperados(res, error);
  }
});

module.exports = router;
