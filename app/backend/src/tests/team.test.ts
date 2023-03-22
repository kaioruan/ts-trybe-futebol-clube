import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { TeamsMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota Teams', () => {
  describe('get /teams', () => {
    before(() => {
      sinon.stub(Team, 'findAll').resolves(TeamsMock as Team[]);
    })

    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })
    it('Retornando a lista de Times com o status 200', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(TeamsMock);
    })
  })
  describe('get /teams/:id', () => {
    before(() => {
      sinon.stub(Team, 'findOne').resolves(TeamsMock[0] as Team);
    })

    after(() => {
      (Team.findOne as sinon.SinonStub).restore();
    })
    it('Retornando um Time com o status 200', async () => {
      const response = await chai.request(app).get('/teams/1');
      expect(response.body).to.be.an('object');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(TeamsMock[0]);
    })
  })
});