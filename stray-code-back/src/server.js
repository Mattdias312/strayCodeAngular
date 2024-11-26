const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute')
const questionarioRoute = require('./routes/questionarioRoute');
const mongoose = require('mongoose');
const port = 3000;
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');
const cors = require('cors');

dotenv.config();

const {MONGO_URI, MONGO_URI_LOCAL} = process.env

let url = MONGO_URI_LOCAL ;
  
let mongodb = MONGO_URI_LOCAL || url;
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',console.error.bind(console, 'error ao conectar com a base de dados'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(loginRoute);
app.use(userRoute);
app.use(questionarioRoute);


module.exports = app; 