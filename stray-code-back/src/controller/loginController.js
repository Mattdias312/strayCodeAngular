var User = require('../model/loginModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, userId } = require('../middleware/authenticateJWT.js')
require('dotenv').config();


exports.getLogin = async function (req, res) {

    try {
        const verificaLogin = await User.findOne({ login: req.body.login });
        
        if (verificaLogin) {
            if(verificaLogin.senha === req.body.senha){
                const token = jwt.sign({ userID: verificaLogin._id, username: verificaLogin.login}, process.env.JWT_SECRET, {expiresIn: '1h'});
                res.status(201).send({ message: 'login efetuado' });

                console.log('contrller ',token)
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
        const verificaLogin = await User.findOne({ login: req.body.login });
        
        if (!verificaLogin) {
            let user = new User({
                login: req.body.login,
                senha: req.body.senha
            });
            await user.save();
            res.status(201).send({ message: 'Usuário criado com sucesso!' });
        } else {
            res.status(400).send({ message: 'Usuário já existe!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Erro ao criar usuário.', error: error.message });
    }
};


exports.details = async function (req, res) {
    try{
        const result = await User.findById(req.params.id);
        console.log('details',req.body.id)
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err);
    }
};

exports.updatePassword = async function (req, res) {
    try {
        const updatedPassword = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPassword) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        }
        res.status(200).json(updatedPassword);
    } catch (err) {
        res.status(500).json({ message: `Erro ao atualizar usuário: ${err.message}` });
    }
};

exports.deleteLogin = async function (req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        }
        res.status(200).send({ message: "Usuário removido com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: `Erro ao remover usuário: ${err.message}` });
    }
};
