const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    login: {type: String, require: true, max: 30},
    senha: {type: String, require: true, max: 30},
});
//Exportar o modelo
module.exports = mongoose.model('User', userSchema)