// import IUser from '../interface/IUser';
// import UserModel from '../models/UserModel';
import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import IUser from '../interface/IUser';
import IToken from '../interface/IToken';
import UserModel from '../database/models/UserModel';

const JWT_SECRET = 'jwt_secret';
class LoginService {
  public model = UserModel;

  public login = async (email: string, password: string): Promise<IToken> => {
    const user = await this.model.findOne({ where: { email }, raw: true }) as IUser;
    if (!user) {
      throw new Error('User not found');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Incorrect password');
    }
    const token = Jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1d',
    });
    return token as unknown as IToken;
  };
}

export default LoginService;
