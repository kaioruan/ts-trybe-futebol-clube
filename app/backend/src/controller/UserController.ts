import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const login = await this.userService.login(email, password);
    return res.status(200).json(login);
  };
}

export default UserController;
