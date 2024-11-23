const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute')
const questionarioRoute = require('./routes/questionarioRoute');
// const mongoose = require('mongoose');
const port = 3000;
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');
const cors = require('cors');

dotenv.config();

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// const {MONGO_URI, MONGO_URI_LOCAL} = process.env

// let url = MONGO_URI ;


// let mongodb = MONGO_URI || url;
// mongoose.connect(mongodb, clientOptions);
// await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error',console.error.bind(console, 'error ao conectar com a base de dados'));

const conn = require('./db/conn');
conn();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendde: false}));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(loginRoute);
app.use(userRoute);
app.use(questionarioRoute);


module.exports = app; 