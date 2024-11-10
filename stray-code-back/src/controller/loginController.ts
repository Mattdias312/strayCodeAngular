import { Request, Response } from 'express';
import  User from '../model/loginModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const getLogin = async (req: Request, res: Response) => {
    try {
        const verificaLogin = await User.findOne({ login: req.body.login });

        if (verificaLogin) {
            if (verificaLogin.senha === req.body.senha) {
                const token = jwt.sign(
                    { userID: verificaLogin._id, username: verificaLogin.login },
                    process.env.JWT_SECRET as string,
                    { expiresIn: '1h' }
                );
                res.status(201).json({ message: 'Login efetuado', token });
            } else {
                res.status(400).send({ message: 'Usuário e/ou senha incorreto' });
            }
        } else {
            res.status(400).send({ message: 'Usuário e/ou senha incorreto' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Erro ao realizar login.', error: (error as Error).message });
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const verificaLogin = await User.findOne({ login: req.body.login });

        if (!verificaLogin) {
            const user = new User({
                login: req.body.login,
                senha: req.body.senha
            });
            await user.save();
            res.status(201).send({ message: 'Usuário criado com sucesso!' });
        } else {
            res.status(400).send({ message: 'Usuário já existe!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Erro ao criar usuário.', error: (error as Error).message });
    }
};

const details = async (req: Request, res: Response) => {
    try {
        const result = await User.findById(req.body.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updatePassword = async (req: Request, res: Response) => {
    try {
        const updatedPassword = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPassword) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        }
        res.status(200).json(updatedPassword);
    } catch (err) {
        res.status(500).json({ message: `Erro ao atualizar usuário: ${(err as Error).message}` });
    }
};

const deleteLogin = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        }
        res.status(200).send({ message: "Usuário removido com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: `Erro ao remover usuário: ${(err as Error).message}` });
    }
};

export default {
    getLogin,
    create,
    details,
    updatePassword,
    deleteLogin
};


// var User = require('../model/loginModel');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// exports.getLogin = async function (req, res) {

//     try {
//         const verificaLogin = await User.findOne({ login: req.body.login });
        
//         if (verificaLogin) {
//             if(verificaLogin.senha === req.body.senha){
//                 const token = jwt.sign({ userID: verificaLogin._id, username: verificaLogin.login}, process.env.JWT_SECRET, {expiresIn: '1h'});
//                 res.status(201).send({ message: 'login efetuado' });
//                 res.json({token});
//             }else{
//                 res.status(400).send({ message: 'Usuário e/ou senha incorreto' });
//             }
//         } else {
//             res.status(400).send({ message: 'Usuário e/ou senha incorreto' });
//         }
//     } catch (error) {
//         res.status(500).send({ message: 'Erro ao criar usuário.', error: error.message });
//     }
// };

// exports.create = async function (req, res) {
    
//     try {
//         const verificaLogin = await User.findOne({ login: req.body.login });
        
//         if (!verificaLogin) {
//             let user = new User({
//                 login: req.body.login,
//                 senha: req.body.senha
//             });
//             await user.save();
//             res.status(201).send({ message: 'Usuário criado com sucesso!' });
//         } else {
//             res.status(400).send({ message: 'Usuário já existe!' });
//         }
//     } catch (error) {
//         res.status(500).send({ message: 'Erro ao criar usuário.', error: error.message });
//     }
// };


// exports.details = async function (req, res) {
//     try{
//         const result = await User.findById(req.body.id);
//         res.status(200).json(result);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// };

// exports.updatePassword = async function (req, res) {
//     try {
//         const updatedPassword = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedPassword) {
//             return res.status(404).send({ message: "Usuário não encontrado!" });
//         }
//         res.status(200).json(updatedPassword);
//     } catch (err) {
//         res.status(500).json({ message: `Erro ao atualizar usuário: ${err.message}` });
//     }
// };

// exports.deleteLogin = async function (req, res) {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);
//         if (!deletedUser) {
//             return res.status(404).send({ message: "Usuário não encontrado!" });
//         }
//         res.status(200).send({ message: "Usuário removido com sucesso!" });
//     } catch (err) {
//         res.status(500).json({ message: `Erro ao remover usuário: ${err.message}` });
//     }
// };
