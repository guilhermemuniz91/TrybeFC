import IUser from './IUsers';

export default interface IUsersModel {
  findByEmail(email: IUser['email']): Promise<IUser | null>;
  findById(id: IUser['id']): Promise<IUser | null>;
}
