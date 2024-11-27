var Questionario = require('../model/questionarioModel');
const mongoose = require('mongoose');

exports.getquestionario = async function (req, res){
    try{
        const result = await Questionario.find().populate('usuario');
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = function (req, res){
    if (req.body.tipoEmpresa.trim() === "" || (Number(req.body.tipoEmpresa) < 1 || Number(req.body.tipoEmpresa) > 3)) {
        return res.status(400).send({ message: "Não pode ser vazio ou Tipo Empresa não cadastrado" });
    }
    if (req.body.ramoEmpresa.trim() === "" || (Number(req.body.ramoEmpresa) < 1 || Number(req.body.ramoEmpresa) > 11)) {
        return res.status(400).send({ message: "Não pode ser vazio ou Ramo Empresa não cadastrado" });
    }
    if (req.body.cnae.trim() === "" || (Number(req.body.cnae) < 1 || Number(req.body.cnae) > 19)) {
    return res.status(400).send({ message: "Não pode ser vazio ou CNAE não cadastrado" });
    }
    let questionario = new Questionario(
        {
            tipoEmpresa: req.body.tipoEmpresa,
            ramoEmpresa: req.body.ramoEmpresa,
            cnae: req.body.cnae,
            usuario: req.body.usuario
        }
    );
    
    questionario.save()
    .then(res.status(201).send(questionario.toJSON()))
    .catch((err) => {
        res.status(500).send({message: `${err.message} - falha ao cadastrar projeto`})
    })
};

exports.details = async function (req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const result = await Questionario.findOne({ usuario: userId });
        if (!result) {
            return res.status(404).send({ message: "Projeto não encontrado para este usuário!" });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.updatequestionario = async function (req, res) {
    if (req.body.tipoEmpresa.trim() === "" || (Number(req.body.tipoEmpresa) < 1 || Number(req.body.tipoEmpresa) > 3)) {
        return res.status(400).send({ message: "Não pode ser vazio ou Tipo Empresa não cadastrado" });
    }
    if (req.body.ramoEmpresa.trim() === "" || (Number(req.body.ramoEmpresa) < 1 || Number(req.body.ramoEmpresa) > 11)) {
        return res.status(400).send({ message: "Não pode ser vazio ou Ramo Empresa não cadastrado" });
    }
    if (req.body.cnae.trim() === "" || (Number(req.body.cnae) < 1 || Number(req.body.cnae) > 19)) {
    return res.status(400).send({ message: "Não pode ser vazio ou CNAE não cadastrado" });
    }
    try {
        const updatedquestionario = await Questionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedquestionario) {
            return res.status(404).send({ message: "Projeto não encontrado!" });
        }
        res.status(200).json(updatedquestionario);
    } catch (err) {
        res.status(500).json({ message: `Erro ao atualizar projeto: ${err.message}` });
    }
};

exports.deletequestionario = async function (req, res) {
    try {
        const deletedquestionario = await Questionario.findByIdAndDelete(req.params.id);
        if (!deletedquestionario) {
            return res.status(404).send({ message: "Projeto não encontrado!" });
        }
        res.status(200).send({ message: "Projeto removido com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: `Erro ao remover projeto: ${err.message}` });
    }
};