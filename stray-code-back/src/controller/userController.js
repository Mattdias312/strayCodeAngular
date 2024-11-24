var User = require('../model/userModel');
require('dotenv').config();

exports.details = async function (req, res) {
    try{
        const result = await User.findById(req.params.id);
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
        const updatedPassword = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
