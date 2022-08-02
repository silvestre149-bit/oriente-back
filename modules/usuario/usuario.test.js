import server from '../../bin/www.js'
import mongoose from "../_database/index.js";
import { Aluno } from './entities/aluno.entity.js'
import { Professor } from './entities/professor.entity.js'
import jwtService from "../auth/jwt.service.js";

import supertest from "supertest";

describe('Testando controller usuário', () => {

  let requisicao = supertest.agent(server);

  beforeAll( (done) => {
    requisicao = supertest.agent(server)
    /* return mongoose.connection.collections.usuarios.drop() */
    done()
  })

  afterAll( (done) => {
    server.close()
    done()
  });

  it('POST /usuario - criar aluno', (done) => {
    const mockUsuario = {
      nome: 'John',
      cod: '456753',
      tipo: 'aluno',
    };
    requisicao.get('/usuario')
    .expect(200)
    
    /* .expect('Content-Type', /json/) */
      /* .send(mockUsuario) */
      /* .expect(201) */
      done()
  })

})

describe('Testando entidade Usuário - inserir usuários', () => {
  beforeAll(async () => {
    return mongoose.connection.collections.usuarios.drop()
  });


  afterAll(async () => {
    return mongoose.connection.close()
  });

  it('deve criar um usuário do tipo aluno', async () => {
    const mockUsuario = {
      nome: 'John',
      cod: '456753',
      tipo: 'aluno',
    };

    const dados = await Aluno.create(mockUsuario);

    expect(dados.nome).toEqual(mockUsuario.nome)
    expect(dados.cod).toEqual(mockUsuario.cod)
    expect(dados.tipo).toEqual(mockUsuario.tipo)
  })

  it('deve criar um usuário do tipo professor', async () => {
    const mockUsuario = {
      nome: 'John',
      cod: '9876543',
      tipo: 'professor',
    };
    const dados = await Professor.create(mockUsuario);

    expect(dados.nome).toEqual(mockUsuario.nome)
    expect(dados.cod).toEqual(mockUsuario.cod)
    expect(dados.tipo).toEqual(mockUsuario.tipo)
  })


});