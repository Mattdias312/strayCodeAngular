const request = require('supertest');
const app = require('../src/server');
const { SENHA1 } = process.env
require('dotenv').config();

let token;

beforeAll(async () => {
  const response = await request(app)
    .post('/login')
    .send({
      login: 'usuarioExistente',
      senha: SENHA1
    });
    
  token = response.body.token;
});

describe('Teste dos endpoints do questionário que devem ser executados com sucesso', () => {
  it.skip('Deve criar um questionário e ligá-lo à um usuário', async () => {
    const response = await request(app)
      .post('/questionario')
      .set('x-access-token', `${token}`)
      .send({
          tipoEmpresa: "Comércio",
          ramoEmpresa: "COMÉRCIO E REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS",
          cnae: "Comércio a varejo de automóveis, camionetas e utilitários novos",
          usuario: "6738ba7e1a5a2f270deaa5b4"
      });

    expect(response.statusCode).toBe(201);
  });

  it('Deve retornar os dados de um questionário', async () => {
    const response = await request(app)
      .get('/questionario/673a6fa22e647f15090a61fe')
      .set('x-access-token', `${token}`)
  
    expect(response.statusCode).toBe(200);
  });

  it('Deve alterar os dados do questionário', async () => {
    const response = await request(app)
      .put('/questionario/673a6fa22e647f15090a61fe')
      .set('x-access-token', `${token}`)
      .send({
          tipoEmpresa: "Serviços",
          ramoEmpresa: "AGRICULTURA, PECUÁRIA E SERVIÇOS RELACIONADOS",
          cnae: "Coleta de látex em florestas nativas",
          usuario: "6738ba7e1a5a2f270deaa5b4"
      })

    expect(response.statusCode).toBe(200);
  });

  it.skip('Deve excluir um questionário do banco de dados', async () => {
    const response = await request(app)
      .delete('/questionario/673a6fa22e647f15090a61fe')
      .set('x-access-token', `${token}`)

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Projeto removido com sucesso!');
  });
});

describe('Teste dos endpoints do questionário sem o token', () => {
  it.only('Deve tentar criar um questionário e ligá-lo à um usuário sem o token e falhar', async () => {
    const response = await request(app)
      .post('/questionario')
      .send({
          tipoEmpresa: "Comércio",
          ramoEmpresa: "COMÉRCIO E REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS",
          cnae: "Comércio a varejo de automóveis, camionetas e utilitários novos",
          usuario: "6738ba7e1a5a2f270deaa5b4"
      });

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Acesso negado. Token não fornecido.');
  });

  it('Deve tentar retornar os dados de um questionário sem um token e falhar', async () => {
    const response = await request(app)
      .get('/questionario/673a6fa22e647f15090a61fe')
  
    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Acesso negado. Token não fornecido.');
  });

  it('Deve tentar alterar os dados do questionário sem o token e falhar', async () => {
    const response = await request(app)
      .put('/questionario/673a6fa22e647f15090a61fe')
      .send({
          tipoEmpresa: "Serviços",
          ramoEmpresa: "AGRICULTURA, PECUÁRIA E SERVIÇOS RELACIONADOS",
          cnae: "Coleta de látex em florestas nativas",
          usuario: "6738ba7e1a5a2f270deaa5b4"
      })

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Acesso negado. Token não fornecido.');
  });

  it('Deve tentar excluir um questionário do banco de dados sem o token e falhar', async () => {
    const response = await request(app)
      .delete('/questionario/673a6fa22e647f15090a61fe')

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Acesso negado. Token não fornecido.');
  });
})

describe('Teste dos endpoints do questionário utilizando um token inválido', () => {
  it('Deve tentar criar um questionário e ligá-lo à um usuário com um token inválido e falhar', async () => {
    const response = await request(app)
      .post('/questionario')
      .set('x-access-token', `${!token}`)
      .send({
          tipoEmpresa: "Comércio",
          ramoEmpresa: "COMÉRCIO E REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS",
          cnae: "Comércio a varejo de automóveis, camionetas e utilitários novos",
          usuario: "6738ba7e1a5a2f270deaa5b4"
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token inválido ou expirado.');
  });

  it('Deve tentar retornar os dados de um questionário fornecendo um token inválido e falhar', async () => {
    const response = await request(app)
      .get('/questionario/673a6fa22e647f15090a61fe')
      .set('x-access-token', `${!token}`)
  
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token inválido ou expirado.');
  });

  it('Deve tentar alterar os dados do questionário fornecendo um token inválido e falhar', async () => {
    const response = await request(app)
      .put('/questionario/673a6fa22e647f15090a61fe')
      .set('x-access-token', `${!token}`)
      .send({
          tipoEmpresa: "Serviços",
          ramoEmpresa: "AGRICULTURA, PECUÁRIA E SERVIÇOS RELACIONADOS",
          cnae: "Coleta de látex em florestas nativas",
          usuario: "6738ba7e1a5a2f270deaa5b4"
      })

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token inválido ou expirado.');
  });

  it('Deve tentar excluir um questionário do banco de dados fornecendo um token inválido e falhar', async () => {
    const response = await request(app)
      .delete('/questionario/673a6fa22e647f15090a61fe')
      .set('x-access-token', `${!token}`)

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token inválido ou expirado.');
  });
})

describe('Teste dos endpoints do questionário utlizando um id inválido', () => {
  it('Deve tentar retornar os dados de um questionário fornecendo um id inválido e falhar', async () => {
    const response = await request(app)
      .get('/questionario/673a6fa22e647f15090a6100')
      .set('x-access-token', `${token}`)
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Projeto não encontrado!');
  });

  it('Deve tentar alterar os dados do questionário fornecendo um id inválido e falhar', async () => {
    const response = await request(app)
      .put('/questionario/673a6fa22e647f15090a6100')
      .set('x-access-token', `${token}`)
      .send({
          tipoEmpresa: "Serviços",
          ramoEmpresa: "AGRICULTURA, PECUÁRIA E SERVIÇOS RELACIONADOS",
          cnae: "Coleta de látex em florestas nativas",
          usuario: "6738ba7e1a5a2f270deaa5b4"
      })

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Projeto não encontrado!');
  });

  it('Deve tentar excluir um questionário do banco de dados fornecendo um id inválido e falhar', async () => {
    const response = await request(app)
      .delete('/questionario/673a6fa22e647f15090a6100')
      .set('x-access-token', `${token}`)

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Projeto não encontrado!');
  });
})
