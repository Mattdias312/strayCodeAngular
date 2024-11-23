const app = require('./server')
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Documentação disponível em: http://localhost:${port}/doc`);
});



// {
//   "version": 2,
//   "public": true,
//   "env": {
//     "JWT_SECRET":"sdaecsvsfs",
//     "MONGO_URI":"mongodb+srv://mattdias:Matt88082799@cluster0.n0lijok.mongodb.net/StrayCode?retryWrites=true&w=majority"
//   },
//   "builds": [
//     {
//       "src": "src/index.js",
//       "use": "@vercel/node",
//       "config": { "includeFiles": ["src/**"] }
//     }
//   ],
//   "routes": [
//     {
//       "src": "/(.*)",
//       "dest": "src/index.js"
//     }
//   ],
//   "projectSettings": {
//     "outputDirectory": "src"
//   }
// }