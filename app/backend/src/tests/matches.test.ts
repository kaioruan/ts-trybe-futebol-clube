import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';
import { MatchesMock, token } from './mocks';

chai.use(chaiHttp);
const newMatch = {
  "homeTeam": 16, 
  "awayTeam": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const { expect } = chai;

describe('Testando a rota Matches', () => { 
  describe('get /matches', () => {
    before(() => {
      sinon.stub(Match, 'findAll').resolves(MatchesMock as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })
    it('Retornando a lista de Partidas com o status 200', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(MatchesMock);
    })
  })
  describe('rota PATCH /matches/:id', () => {
    before(() => {
      sinon.stub(Match, 'findOne').resolves(MatchesMock[0] as Match);
    })

    after(() => {
      (Match.findOne as sinon.SinonStub).restore();
    })
    it('Retornando uma Partida com o status 200', async () => {
      const response = await chai.request(app)
      .patch('/matches/1').set('content-type', 'application/json')
      .send({ "home_score": 2, "away_score": 1 });
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
    })
  })
  describe('Utilizando a query ?inProgress=true', () => {
    before(() => {
      sinon.stub(Match, 'findAll').resolves(MatchesMock as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })
    it('Retornando a lista de Partidas em andamento com o status 200', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
    })
    it('Retornando a lista de Partidas Finalizadas com o status 200', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
    })
    it('Alterando o status de uma partida em andamento para finalizada', async () => {
      const response = await chai.request(app)
      .patch('/matches/1/finish')
      expect(response.body).to.be.an('object');
      expect(response.status).to.be.equal(200);
    })
  })
  describe('rota POST /matches', () => {
    before(() => {
      sinon.stub(Match, 'create').resolves(MatchesMock[0] as Match);
    })

    after(() => {
      (Match.create as sinon.SinonStub).restore();
    })
    it('Criando uma Partida com o status 201', async () => {
      const response = await chai.request(app)
      .post('/matches')
      .set('authorization', token)
      .send(newMatch);
      expect(response.body).to.be.an('object');
      expect(response.status).to.be.equal(201);
    })
  })
});