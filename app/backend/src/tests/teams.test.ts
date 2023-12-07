import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/Teams';
import { allTeams, teams } from './mocks/mocksTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /teams', () => {
  it('Deve retornar todos os times', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  it('Deve retornar times por id', async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Deve retornar "not found" caso o id não exista', async () =>{
    sinon.stub(TeamsModel, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1000');

    expect(status).to.equal(404);
    expect(body.message).to.equal('team 1000 not found');
  });

  afterEach(sinon.restore);
});