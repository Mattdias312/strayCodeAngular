import { Request, Response } from 'express';
import Questionario from '../model/questionarioModel';

const getQuestionario = async (_req: Request, res: Response) => {
    try {
        const result = await Questionario.find().populate('assignedTo');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const create = (_req: Request, res: Response) => {
    const questionario = new Questionario({
        tipoEmpresa: _req.body.tipoEmpresa,
        ramoEmpresa: _req.body.ramoEmpresa,
        cnae: _req.body.cnae,
        usuario: _req.body.usuario
    });

    questionario.save()
        .then(() => {
            res.status(201).send(questionario.toJSON());
        })
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar projeto` });
        });
};

const details = async (_req: Request, res: Response): Promise<any> => {
    try {
        const result = await Questionario.findById(_req.params.id);
        if (!result) {
            return res.status(404).send({ message: "Projeto não encontrado!" });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateQuestionario = async (_req: Request, res: Response): Promise<any> => {
    try {
        const updatedQuestionario = await Questionario.findByIdAndUpdate(_req.params.id, _req.body, { new: true });
        if (!updatedQuestionario) {
            return res.status(404).send({ message: "Projeto não encontrado!" });
        }
        res.status(200).json(updatedQuestionario);
    } catch (err) {
        res.status(500).json({ message: `Erro ao atualizar projeto: ${err.message}` });
    }
};

const deleteQuestionario = async (_req: Request, res: Response): Promise<any> => {
    try {
        const deletedQuestionario = await Questionario.findByIdAndDelete(_req.params.id);
        if (!deletedQuestionario) {
            return res.status(404).send({ message: "Projeto não encontrado!" });
        }
        res.status(200).send({ message: "Projeto removido com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: `Erro ao remover projeto: ${err.message}` });
    }
};

export default {
    getQuestionario,
    create,
    details,
    updateQuestionario,
    deleteQuestionario
};





// var Questionario = require('../model/questionarioModel');

// exports.getquestionario = async function (req, res){
//     try{
//         const result = await questionario.find().populate('assignedTo');
//         res.status(200).json(result)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// exports.create = function (req, res){

//     let questionario = new Questionario(
//         {
//             tipoEmpresa: req.body.tipoEmpresa,
//             ramoEmpresa: req.body.ramoEmpresa,
//             cnae: req.body.cnae,
//             usuario: req.body.usuario
//         }
//     );
    
//     questionario.save()
//     .then(res.status(201).send(questionario.toJSON()))
//     .catch((err) => {
//         res.status(500).send({message: `${err.message} - falha ao cadastrar projeto`})
//     })
// };

// exports.details = async function (req, res) {
//     try {
//         const result = await questionario.findById(req.params.id);
//         res.status(200).json(result)
//     }catch (err) {
//         res.status(500).json(err);
//     }
// };

// exports.updatequestionario = async function (req, res) {
//     try {
//         const updatedquestionario = await questionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedquestionario) {
//             return res.status(404).send({ message: "Projeto não encontrado!" });
//         }
//         res.status(200).json(updatedquestionario);
//     } catch (err) {
//         res.status(500).json({ message: `Erro ao atualizar projeto: ${err.message}` });
//     }
// };

// exports.deletequestionario = async function (req, res) {
//     try {
//         const deletedquestionario = await questionario.findByIdAndDelete(req.params.id);
//         if (!deletedquestionario) {
//             return res.status(404).send({ message: "Projeto não encontrado!" });
//         }
//         res.status(200).send({ message: "Projeto removido com sucesso!" });
//     } catch (err) {
//         res.status(500).json({ message: `Erro ao remover projeto: ${err.message}` });
//     }
// };