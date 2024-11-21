const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    usuario: {type: String, require: true, min: 3, max: 30},
    senha: {type: String, require: true, min: 6, max: 30},
});

//Exportar o modelo
module.exports = mongoose.model('User', userSchema)