const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const loginRoute = require('./src/routes/loginRoute.js');
const questionarioRoute = require('./src/routes/questionarioRoute.js');
const mongoose = require('mongoose');
const port = 3000;
// const cors = require('cors');

// app.use(cors());

// // Rota de exemplo
// app.get('/api/data', (req, res) => {
//     res.json({ message: 'Olá do Node.js!' });
//   });

let url = 'mongodb://localhost:27017/strayCode';
let mongodb = process.env.MONGODB_URI || url;
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',console.error.bind(console, 'error ao conectar com a base de dados'));

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendde: false}));
app.use(loginRoute);
app.use(questionarioRoute);


app.listen(port, () => {
    console.log('Servidor em execução na porta 3000');
});

// const express = require('express');
// const app = express();
// const port = 3000;

// // Middleware para permitir requisições de outros domínios (CORS)
// const cors = require('cors');
// app.use(cors());

// // Rota de exemplo
// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Olá do Node.js!' });
// });

// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);
// });
