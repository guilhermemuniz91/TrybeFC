import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/SequelizeTeams';
import { allTeams, teams } from './mocks/mocksTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /teams', () => {
  it('A requisição deve retornar todos os times', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  it('A requisição deve retornar o time com o id correto', async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('A requisição deve retornar uma mensagem de erro caso não encontre o time', async () =>{
    sinon.stub(TeamsModel, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1000');

    expect(status).to.equal(404);
    expect(body.message).to.equal('team 1000 not found');
  });

  afterEach(sinon.restore);
});