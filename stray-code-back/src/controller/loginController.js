var User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, userId } = require('../middleware/authenticateJWT.js')
const bcrypt = require('bcrypt');
require('dotenv').config();


exports.login = async function (req, res) {

    try {
        const verificaLogin = await User.findOne({ usuario: req.body.usuario });
        
        if (verificaLogin) {
            // Compara a senha fornecida com a senha criptografada armazenada
            const isMatch = await bcrypt.compare(req.body.senha, verificaLogin.senha);
            if (isMatch) {
                const token = jwt.sign({userID: verificaLogin._id, username: verificaLogin.usuario},
                                        process.env.JWT_SECRET, {expiresIn: '1h'});
                res.status(200).send({ message: 'login efetuado', success: true, token: token, id: verificaLogin._id});

            }else{
                res.status(400).send({ message: 'Usuário e/ou senha incorreto' });
            }
        } else {
            res.status(400).send({ message: 'Usuário e/ou senha incorreto' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Erro ao efetuar login.', error: error.message });
    }
};

exports.create = async function (req, res) {
    
    try {
        const verificaLogin = await User.findOne({ usuario: req.body.usuario });

        if (!verificaLogin) {
            let user = new User({
                usuario: req.body.usuario,
                senha: req.body.senha
            });
            await user.save();
            res.status(201).send({ message: 'Usuário criado com sucesso!', success: true });
        } else {
            res.status(400).send({ message: 'Usuário já existe!'});
        }
    } catch (error) {
        res.status(500).send({ message: 'Erro ao criar usuário.', error: error.message, success: false });
    }
};
