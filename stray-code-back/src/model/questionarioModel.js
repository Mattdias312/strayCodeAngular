const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    tipoEmpresa:
    {
        type: String, required: true,
        enum: ['Comércio', 'Indústria', 'Serviço'],
        required: true
    },
    ramoEmpresa:
    {
        type: String, required: true
    },
    cnae:
    {
        type: String, required: true
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Questionario', projectSchema);