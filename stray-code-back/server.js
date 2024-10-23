const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const loginRoute = require('./src/route/loginRoute');
const questionarioRoute = require('./src/route/questionarioRoute');
const mongoose = require('mongoose');
const port = 3000;
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.MONGO_URI_LOCAL)

const {MONGO_URI, MONGO_URI_LOCAL} = process.env

let url = MONGO_URI_LOCAL ;
  
let mongodb = MONGO_URI_LOCAL || url;
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',console.error.bind(console, 'error ao conectar com a base de dados'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendde: false}));
app.use(loginRoute);
app.use(questionarioRoute);


app.listen(port, () => {
    console.log('Servidor em execução na porta 3000');
});
