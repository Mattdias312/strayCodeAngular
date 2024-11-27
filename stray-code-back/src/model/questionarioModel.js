const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    tipoEmpresa:
    {
        type: String, required: true,
        enum: ["1", "2", "3"]
    },
    ramoEmpresa:
    {
        type: String, required: true,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    cnae:
    {
        type: String, required: true,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Questionario', projectSchema);