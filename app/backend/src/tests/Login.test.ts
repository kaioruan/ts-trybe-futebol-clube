import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/UserModel';
import { UsersMock, token } from './mocks';

chai.use(chaiHttp);

const expect = chai.expect;

const UserLogin = {
  email: 'divinesmite@critic.com',
  password: 'secret_admin',
}

describe('Rota Login', () => {
  describe('Usuário válido', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(UsersMock[0] as User);
    })

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Retorna um Token JWT com status 200', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(UserLogin);

      expect(response.body).to.have.property('token');
      expect(response.status).to.be.equal(200);
    });
  })
  describe('Rota /login/validate', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(UsersMock[0] as User);
    })

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Retornar usuário encontrado', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', token);
        expect(response.body).to.be.deep.equal({ role: UsersMock[0].role });
        expect(response.status).to.be.equal(200);
    })
  })
})