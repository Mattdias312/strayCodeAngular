const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../model/loginModel.js')

const authenticateJWT = (req, res, next) => {
  const [, token] = req.header('Authorization')?.split(' '); // Extrai o token do header Authorization

  if (!token) {
    return res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona as informações do usuário ao request
    const userIdfromToken = typeof decoded != "string" && decoded.user;

    if(!user && userIdfromToken) {
      return res.send(401).json({ message: "Token inválido" });
    }

    request.headers["user"] = decoded.user;
    res.send(200).json({ message: "Token válido" })
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

module.exports = authenticateJWT;
