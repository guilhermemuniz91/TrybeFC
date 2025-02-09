import { Request, Response } from 'express';
import UserService from '../services/UserServices';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.login(email, password);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public static getRole(req: Request, res: Response) {
    const { role } = res.locals.user;
    return res.status(200).json({ role });
  }
}
