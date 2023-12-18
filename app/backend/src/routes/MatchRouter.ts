import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import ValidateToken from '../middlewares/validateToken';
import validateMatch from '../middlewares/validateMatch';

const MatchesController = new MatchController();

const MatchRouter = Router();

MatchRouter.get('/', (req: Request, res: Response) => MatchesController.getAllMatches(req, res));

MatchRouter.patch('/:id/finish', ValidateToken, (req: Request, res: Response) =>
  MatchesController.finishMatches(req, res));

MatchRouter.patch('/:id', ValidateToken, (req: Request, res: Response) =>
  MatchesController.update(req, res));

MatchRouter.post('/', ValidateToken, validateMatch, (req: Request, res: Response) =>
  MatchesController.create(req, res));

export default MatchRouter;
