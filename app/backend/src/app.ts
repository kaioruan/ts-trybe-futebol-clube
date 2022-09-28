import * as express from 'express';
import TeamsController from './controller/TeamsController';
import LoginController from './controller/UserLogin';
import LoginValidation from './middlewares/LoginValidation';

const loginController = new LoginController();
const loginValidation = new LoginValidation();
const teamsController = new TeamsController();
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', loginValidation.loginV, loginController.login);
    this.app.get('/login/validate', loginController.validate);
    this.app.get('/teams', teamsController.getAllTeams);
    this.app.get('/teams/:id', teamsController.getById);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
