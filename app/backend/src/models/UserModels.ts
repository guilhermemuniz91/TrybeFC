import IUser from '../Interfaces/IUsers';

import UsersModel from '../database/models/Users';
import IUserModel from '../Interfaces/IUsersModel';

export default class UserModel implements IUserModel {
  model = UsersModel;

  async findAll(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username, role } = user;
    return { id, email, password, username, role };
  }
}
