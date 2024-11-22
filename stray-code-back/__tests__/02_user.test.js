const request = require('supertest');
const app = require('../src/server');
const {SENHA1, SENHA2} = process.env
require('dotenv').config();

let token;

beforeAll(async () => {
  const response = await request(app)
    .post('/login')
    .send({
      login: 'teste',
      senha: SENHA2
    });
    
  token = response.body.token;
});

describe('Teste dos endpoints de usuário que estão protegidos', () => {
  it('Deve acessar as informações do usuário', async () => {
    const response = await request(app)
      .get('/user/673a30fcbe906edc0088ced9')
      .set('x-access-token', `${token}`); // Define o cabeçalho com o token JWT

    expect(response.statusCode).toBe(200);
  });

  it.skip('Deve alterar a senha', async () => { // Altere o skip somente para rodar o teste final
    const response = await request(app)
      .put('/user/673a30fcbe906edc0088ced9')
      .set('x-access-token', `${token}`)
      .send({ senha:  SENHA2});

    expect(response.statusCode).toBe(200);
  });

  it.skip('Deve excluir um usuário com sucesso', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        login: 'usuarioTeste',
        senha: SENHA1
      });
    token2 = res.body.token;
    const response = await request(app)
      .delete('/user/(id)') // Trocar pelo ID do usuarioTeste
      .set('x-access-token', `${token2}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário removido com sucesso!');
  });
});

describe('Teste dos endpoints de usuário sem fornecer um token', () => {
  it.only('Deve falhar ao tentar acessar as informações do usuário sem o token', async () => {
    const response = await request(app)
      .get('/user/673a30fcbe906edc0088ced9');

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Acesso negado. Token não fornecido.');
  });

  it('Deve falhar ao tentar alterar a senha sem um token', async () => {
    const response = await request(app)
      .put('/user/673a30fcbe906edc0088ced9')
      .send({ senha: SENHA2 });

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Acesso negado. Token não fornecido.');
  });

  it('Deve falhar ao tentar excluir um usuário sem o token', async () => {
    const response = await request(app)
      .delete('/user/673a30fcbe906edc0088ced9')

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Acesso negado. Token não fornecido.');
  });
})

describe('Teste dos endpoints de usuário fornecendo um token inválido', () => {
  it('Deve falhar ao tentar acessar as informações do usuário com um token inválido', async () => {
    const response = await request(app)
      .get('/user/673a30fcbe906edc0088ced9')
      .set('x-access-token', `${!token}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token inválido ou expirado.');
  });

  it('Deve falhar ao tentar alterar a senha com um token inválido', async () => {
    const response = await request(app)
      .put('/user/673a30fcbe906edc0088ced9')
      .set('x-access-token', `${!token}`)
      .send({ senha: SENHA2 });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token inválido ou expirado.');
  });

  it('Deve falhar ao tentar excluir um usuário com um token inválido', async () => {
    const response = await request(app)
      .delete('/user/673a30fcbe906edc0088ced9')
      .set('x-access-token', `${!token}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token inválido ou expirado.');
  });
})

describe('Teste dos endpoints de usuário fornecendo um id inválido', () =>{
  it('Deve falhar ao tentar exibir os dados de um usuário com um id inválido', async () => {
    const response = await request(app)
      .get('/user/6737ac512be071efd96a3033')
      .set('x-access-token', `${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Usuário não encontrado!');
  });

  it('Deve falhar ao tentar alterar a senha com um id inválido', async () => {
    const response = await request(app)
      .put('/user/6737ac512be071efd96a0000')
      .set('x-access-token', `${token}`)
      .send({ senha: SENHA2 });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Usuário não encontrado!');
  });

  it('Deve falhar ao tentar excluir um usuário com um id inválido', async () => {
    const response = await request(app)
      .delete('/user/673a20a35e5aea9c7a020101')
      .set('x-access-token', `${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Usuário não encontrado!');
  });
})
