import IUser from '../Interfaces/IUsers';

import UsersModel from '../database/models/Users';
import IUserModel from '../Interfaces/IUsersModel';

export default class UserModel implements IUserModel {
  model = UsersModel;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { id } });
    return user;
  }
}
