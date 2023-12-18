import IUser from './IUsers';

export default interface IUsersModel {
  findAll(email: IUser['email']): Promise<IUser | null>,
}
