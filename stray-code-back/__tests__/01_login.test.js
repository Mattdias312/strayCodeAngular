const request = require('supertest');
const app = require('../src/server');
const { SENHA1 } = process.env;
require('dotenv').config();


describe('Teste do método para criar usuário', () => {
  it('Deve criar um novo usuário com sucesso', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        login: 'usuarioTeste',
        senha: SENHA1
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso!');
  });

  it('Deve retornar erro ao tentar criar um usuário já existente', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        login: 'usuarioExistente',
        senha: SENHA1
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Usuário já existe!');
  });
});

describe('Teste dos métodos de login', () => {
  it.only('Deve fazer login com sucesso e retornar um token', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        login: 'usuarioTeste',
        senha: SENHA1
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'login efetuado');
    expect(response.body).toHaveProperty('token');
  });

  it('Deve falhar ao tentar fazer login com usuário incorreto', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        login: 'usuarioErrado',
        senha: SENHA1
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Usuário e/ou senha incorreto');
  });

  it('Deve falhar ao tentar fazer login com senha incorreta', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        login: 'usuarioTeste',
        senha: 'senhaErrada'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Usuário e/ou senha incorreto');
  });

  it('Deve falhar ao tentar fazer login com usuário inexistente', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        login: 'usuarioInexistente',
        senha: 'senhaQualquer'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Usuário e/ou senha incorreto');
  });
});
