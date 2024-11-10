import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extrai o token do header Authorization

  if (!token) {
    return res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Adiciona as informações do usuário ao request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authenticateJWT;


// const jwt = require('jsonwebtoken');

// const authenticateJWT = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Extrai o token do header Authorization

//   if (!token) {
//     return res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
//   }

//   try {
//     // Verifica o token JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Adiciona as informações do usuário ao request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token inválido ou expirado.' });
//   }
// };

// module.exports = authenticateJWT;
