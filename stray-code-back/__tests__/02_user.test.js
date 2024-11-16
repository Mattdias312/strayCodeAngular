const request = require('supertest');
const app = require('../server');
const { login } = require('../src/controller/loginController');

let token;

beforeAll(async () => {
  const response = await request(app)
    .post('/login')
    .send({
      login: 'test',
      senha: 'test'
    });
    
  token = response.body.token;
});

describe('Teste de endpoints protegidos', () => {
  it('Deve acessar um endpoint protegido com sucesso', async () => {
    const response = await request(app)
      .get('/login/6737ac512be071efd96a2521')
      .set('x-access-token', `${token}`); // Define o cabeçalho com o token JWT

    expect(response.statusCode).toBe(200);
  });

  it('Deve falhar ao acessar um endpoint protegido sem o token', async () => {
    const response = await request(app)
      .get('/login/6737ac512be071efd96a2521');

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Acesso negado. Token não fornecido.');
  });
});
