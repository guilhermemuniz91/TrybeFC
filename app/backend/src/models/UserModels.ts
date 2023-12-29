import SequelizeUser from '../database/models/SequelizeUsers';
import { IUserModel } from '../Interfaces/IUserModel';
import { IUser } from '../Interfaces/IUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return user.toJSON();
  }
}
