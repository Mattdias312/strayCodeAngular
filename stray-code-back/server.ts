import express from 'express';
import bodyParser from 'body-parser';
import loginRoute from './src/routes/loginRoute';
import questionarioRoute from './src/routes/questionarioRoute';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger_output.json';

dotenv.config();

const app = express();
const port = 3003;

const { MONGO_URI, MONGO_URI_LOCAL } = process.env;

const url = MONGO_URI_LOCAL || MONGO_URI;
mongoose.connect(url as string);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar com a base de dados'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/login', loginRoute);
app.use('/questionario', questionarioRoute);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Documentação disponível em: http://localhost:${port}/api-docs`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const loginRoute = require('./src/routes/loginRoute');
// const questionarioRoute = require('./src/routes/questionarioRoute');
// const mongoose = require('mongoose');
// const port = 3003;
// const dotenv = require('dotenv');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger_output.json');

// dotenv.config();

// console.log(process.env.MONGO_URI_LOCAL)

// const {MONGO_URI, MONGO_URI_LOCAL} = process.env

// let url = MONGO_URI_LOCAL ;
  
// let mongodb = MONGO_URI_LOCAL || url;
// mongoose.connect(mongodb);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error',console.error.bind(console, 'error ao conectar com a base de dados'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extendde: false}));
// app.use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(loginRoute);
// app.use(questionarioRoute);


// app.listen(port, () => {
//     console.log(`Servidor rodando na porta ${port}`);
//     console.log(`Documentação disponível em: https://localhost:3003/api-docs`)
// });
