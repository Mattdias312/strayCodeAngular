const bcrypt = require('bcrypt');

async function encryptPassword(req, res, next) {
  
  try {
    if (req.body.senha) {
      if (req.body.senha.trim() === "") {
        return res.status(400).send({ message: "A senha não pode ser vazia." });
      }
      if (req.body.senha.length < 6) {
          return res.status(400).send({ message: "A senha deve ter pelo menos 6 caracteres." });
      }
      if (req.body.senha.length > 30) {
        return res.status(400).send({ message: "A senha não deve exceder 30 caracteres." });
  }
      const salt = await bcrypt.genSalt(10); // Criptografa a senha com um salt de 10 rounds
      req.body.senha = await bcrypt.hash(req.body.senha, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = encryptPassword;
