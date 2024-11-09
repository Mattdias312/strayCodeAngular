const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API de Cadastro',
        description: 'Documentação da API de Cadastro',
    },
    host: 'localhost:3003',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/loginRoute.js', './src/routes/questionarioRoute.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js');
});
