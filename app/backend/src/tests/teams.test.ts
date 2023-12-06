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
  it('Should return all teams', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  afterEach(sinon.restore);
});