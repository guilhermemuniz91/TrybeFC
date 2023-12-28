import * as bcrypt from 'bcryptjs';
import { ILogin } from '../Interfaces/ILogin';
import UserModel from '../models/UserModels';
import IUsersModel from '../Interfaces/IUsersModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/IServiceResponse';
import jwt from '../utils/jwt';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUsersModel = new UserModel(),
    private jwtService = jwt,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'Invalid email or password' },
      };
    }
    const bcryptMatch = await bcrypt.compare(data.password, user.password);

    if (!bcryptMatch) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'Invalid email or password' },
      };
    }
    const token = this.jwtService.sign(
      { id: user.id, email: user.email, username: user.username },
    );
    return { status: 'SUCCESSFUL', data: { token } };
  }

  // public async getRole(id:number): Promise<ServiceResponse<string>> {
  //   const user = await this.userModel.findById(Number(id));

  //   if (!user) {
  //     return {
  //       status: 'NOT_FOUND',
  //       data: { message: 'User not found' },
  //     };
  //   }

  //   return { status: 'SUCCESSFUL', data: user.role };
  // }
}
