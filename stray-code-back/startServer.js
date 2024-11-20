const app = require('./server')
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Documentação disponível em: http://localhost:${port}/doc`);
});