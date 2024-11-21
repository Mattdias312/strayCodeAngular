const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API de Cadastro',
        description: 'Documentação da API de Cadastro',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/loginRoute.js', './src/routes/userRoute.js', './src/routes/questionarioRoute.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/server.js');
});
