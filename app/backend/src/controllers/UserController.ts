import { Request, Response } from 'express';
import UserService from '../services/UserServices';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);

    if (serviceResponse.status === 'INVALID_DATA') {
      return res.status(401).json(serviceResponse.data);
    }

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(401).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
