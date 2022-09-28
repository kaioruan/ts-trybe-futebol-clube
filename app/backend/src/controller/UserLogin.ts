import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

// const ERROR_500 = 'Internal Server Error';

class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const result = await this.loginService.login(email, password);
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ token: result });
  };

  public validate = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    if (authorization) {
      const result = await this.loginService.validate(authorization);
      return res.status(200).json({ role: result });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  };
}

export default LoginController;
