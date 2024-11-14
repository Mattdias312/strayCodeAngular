const request = require('supertest');
const server = require('../server.js');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Testes de Endpoints de Login', () => {
  
  it('Deve criar um novo usuário', async () => {
    const res = await request(server)
      .post('/login')
      .send({ login: 'novoUsuario', senha: 'novaSenha' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Usuário criado com sucesso!');
  });

  it('Deve falhar ao criar um usuário existente', async () => {
    const res = await request(server)
      .post('/login')
      .send({ login: 'testUser', senha: 'testPassword' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Usuário já existe!');
  });

 it('Deve fazer login e retornar um token', async () => {
    const res = await request(server)
      .post('/login')
      .send({ login: 'testUser', senha: 'testPassword' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('login efetuado');
    expect(res.body.token).toBeDefined();
  });

 it.skip('Deve retornar detalhes do usuário autenticado', async () => {
    const res = await request(server)
      .get('/login/ID_DO_USUARIO') // Substitua pelo ID real
      .set('x-access-token', token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
  });

});

 
