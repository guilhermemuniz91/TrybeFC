import { Request, Router, Response } from 'express';
import ValidateLogin from '../middlewares/validateLogin';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validateToken';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/',
  ValidateLogin,
  ((req: Request, res: Response) => userController.login(req, res)),
);

userRouter.get(
  '/role',
  Validations.validateToken,
  ((req: Request, res: Response) => UserController.getRole(req, res)),
);

export default userRouter;
