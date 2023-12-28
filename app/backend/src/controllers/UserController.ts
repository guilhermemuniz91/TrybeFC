import { Request, Response } from 'express';
import UserService from '../services/UserServices';
// import { ServiceResponse } from '../Interfaces/IServiceResponse';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const service = await this.userService.login(req.body);

    if (service.status === 'INVALID_DATA') {
      return res.status(401).json(service.data);
    }

    if (service.status === 'NOT_FOUND') {
      return res.status(401).json(service.data);
    }
    return res.status(200).json(service.data);
  }

  // public async getRole(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.body.data;
  //   if (!id) return res.status(400).json({ message: 'User not found' });
  //   const { data }: ServiceResponse<string> = await this.userService.getRole(id);
  //   return res.status(200).json(data);
  // }
}
