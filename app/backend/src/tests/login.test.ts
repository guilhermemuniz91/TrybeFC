import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { invalidEmailLoginBody, jwtPayload, registeredUser, validLoginBody } from './mocks/mocksLogin';
import SequelizeUser from '../database/models/SequelizeUsers';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /login', () => {
  afterEach(sinon.restore);

  it('A requisição deve retornar uma mensagem de erro com email inválido', async function() {
    const { status, body } = await chai.request(app).post('/login').send(invalidEmailLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('A requisição deve retornar um token quando o login é efetuado com sucesso', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(registeredUser));
    sinon.stub(JWT, 'sign').returns('token');

    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.property('token');
  });

  it('A requisição deve retornar o role do usuário se receber um token válido', async function() {
    sinon.stub(JWT, 'verify').returns(jwtPayload);

    const { status, body } = await chai.request(app).get('/login/role').set('Authorization', 'validToken');

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ role: jwtPayload.role });
  });
});