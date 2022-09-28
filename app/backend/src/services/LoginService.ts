// import IUser from '../interface/IUser';
// import UserModel from '../models/UserModel';
import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import IUser from '../interface/IUser';
import IToken from '../interface/IToken';
import IRole from '../interface/IRole';
import UserModel from '../database/models/UserModel';

interface token {
  userId: number;
  iat: number;
  exp: number;
}
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

  public validate = async (authorization: string): Promise<IRole> => {
    const token = Jwt.verify(authorization, JWT_SECRET) as token;
    console.log('AAAAAAAAAAa', token);
    if (token) {
      const { userId } = token;
      const result = await this.model.findOne(
        { where: { id: userId }, raw: true },
      ) as IUser;
      return result.role as unknown as IRole;
    }
    return null as unknown as IRole;
  };
}

export default LoginService;
