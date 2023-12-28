import { Request, Router, Response } from 'express';

import ValidateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';
import UserController from '../controllers/UserController';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/',
  ValidateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

// userRouter.get(
//   '/role',
//   validateToken,
//   (req: Request, res: Response) => userController.getRole(req, res),
// );

userRouter.get(
  '/role',
  validateToken,
  (req, res) => {
    const { role } = req.body.user;
    res.status(200).json({ role });
  },
);

export default userRouter;
