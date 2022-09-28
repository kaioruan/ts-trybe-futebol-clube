import { Request, Response, NextFunction } from 'express';

class LoginValidation {
  public loginV = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };
}

export default LoginValidation;
