var User = require('../model/userModel');
require('dotenv').config();

exports.details = async function (req, res) {
    try{
        const result = await User.findById(req.params.id).select('-senha');
        if (!result) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        }
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err);
    }
};

exports.updatePassword = async function (req, res) {
    try {
        const updatedPassword = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-senha');
        if (req.body.senha.trim() === "") {
            return res.status(400).send({ message: "A senha não pode ser vazia." });
        }
        if (req.body.senha.length < 6) {
              return res.status(400).send({ message: "A senha deve ter pelo menos 6 caracteres." });
        }
        if (req.body.senha.length > 30) {
            return res.status(400).send({ message: "A senha não deve exceder 30 caracteres." });
      }
        if (!updatedPassword) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        }
        res.status(200).json(updatedPassword);
    } catch (err) {
        res.status(500).json({ message: `Erro ao atualizar usuário: ${err.message}` });
    }
};

exports.deleteUser = async function (req, res) {
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
