const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
    usuario: {
        type: String,
        required: [true, 'O nome de usuário é obrigatório'],
        minlength: [3, 'O nome de usuário deve ter pelo menos 3 caracteres'],
        maxlength: [30, 'O nome de usuário pode ter no máximo 30 caracteres'],
    },
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        minlength: [6, 'A senha deve ter pelo menos 6 caracteres'],
        maxlength: [30, 'A senha pode ter no máximo 30 caracteres'],
    },
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('senha')) {
        if (user.senha.length > 30) {
            return next(new Error('A senha não pode exceder 30 caracteres'));
        }

        try {
            // Criptografando a senha antes de salvar
            const salt = await bcrypt.genSalt(10);
            user.senha = await bcrypt.hash(user.senha, salt);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema)