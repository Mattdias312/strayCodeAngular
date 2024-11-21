const bcrypt = require('bcrypt');

async function encryptPassword(req, res, next) {
  try {
    if (req.body.senha) {
      const salt = await bcrypt.genSalt(10); // Criptografa a senha com um salt de 10 rounds
      req.body.senha = await bcrypt.hash(req.body.senha, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = encryptPassword;
