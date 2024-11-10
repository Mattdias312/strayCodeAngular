import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    login: string;
    senha: string;
}

const userSchema = new Schema<IUser>({
    login: { type: String, required: true, maxlength: 30 },
    senha: { type: String, required: true, maxlength: 30 }
});

export default mongoose.model<IUser>('User', userSchema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// let userSchema = new Schema({
//     login: {type: String, require: true, max: 30},
//     senha: {type: String, require: true, max: 30},
// });
// //Exportar o modelo
// module.exports = mongoose.model('User', userSchema)