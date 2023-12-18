import { Request, Router, Response } from 'express';

import ValidateLogin from '../middlewares/validateLogin';
import ValidateToken from '../middlewares/validateToken';
import UserController from '../controllers/UserController';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/',
  ValidateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

userRouter.get(
  '/role',
  ValidateToken,
  (_req: Request, res: Response) => res.status(200).json({ role: res.locals.user.role }),
);

export default userRouter;
