import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { UsersMock, token } from './mocks';
import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardServiceHome from '../services/LeaderBoardServiceHome';
import LeaderBoardServiceAway from '../services/LeaderBoardServiceAway';
import { LeaderBoard, LeaderBoardHome, LeaderBoardAway } from './mocks/LeaderBoardMock';
import ILeaderBoard from '../interface/LeaderBoard';


chai.use(chaiHttp);

const expect = chai.expect;
const leaderBoardService = new LeaderBoardService();
const leaderBoardServiceHome = new LeaderBoardServiceHome();
const leaderBoardServiceAway = new LeaderBoardServiceAway();
describe('Rota LeaderBoard', () => {
  describe('Rota /leaderboard', () => {
    before(async () => {
      sinon.stub(leaderBoardService, 'LeaderBoard').resolves(LeaderBoard as unknown as ILeaderBoard[]);
    })

    after(() => {
      (leaderBoardService.LeaderBoard as sinon.SinonStub).restore();
    })
    it('Retornar LeaderBoard', async () => {
      const response = await chai.request(app)
        .get('/leaderboard')
        .set('authorization', token);
        expect(response.body).to.be.deep.equal(LeaderBoard);
        expect(response.body).to.be.an('array');
        expect(response.status).to.be.equal(200);
        expect(response.body[0]).to.have.all.keys(
          ['name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses',
          'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency'])
    })
  })
  describe('Rota /leaderboard/home', () => {
    before(async () => {
      sinon.stub(leaderBoardServiceHome, 'LeaderBoard').resolves(LeaderBoardHome as unknown as ILeaderBoard[]);
    })

    after(() => {
      (leaderBoardServiceHome.LeaderBoard as sinon.SinonStub).restore();
    })
    it('Retornar LeaderBoard', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/home')
        .set('authorization', token);
        expect(response.body).to.be.deep.equal(LeaderBoardHome);
        expect(response.body).to.be.an('array');
        expect(response.status).to.be.equal(200);
        expect(response.body[0]).to.have.all.keys(
          ['name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses',
          'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency'])
    })
  })
  describe('Rota /leaderboard/away', () => {
    before(async () => {
      sinon.stub(leaderBoardServiceAway, 'LeaderBoard').resolves(LeaderBoardAway as unknown as ILeaderBoard[]);
    })

    after(() => {
      (leaderBoardServiceAway.LeaderBoard as sinon.SinonStub).restore();
    })
    it('Retornar LeaderBoard', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/away')
        .set('authorization', token);
        expect(response.body).to.be.deep.equal(LeaderBoardAway);
        expect(response.body).to.be.an('array');
        expect(response.status).to.be.equal(200);
        expect(response.body[0]).to.have.all.keys(
          ['name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses',
          'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency'])
    })
  })
})