import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/validateToken';
import validateMatch from '../middlewares/validateMatch';

const MatchesController = new MatchController();

const MatchRouter = Router();

MatchRouter.get('/', (req: Request, res: Response) => MatchesController.getAllMatches(req, res));

MatchRouter.patch('/:id/finish', Validations.validateToken, (req: Request, res: Response) =>
  MatchesController.finishMatches(req, res));

MatchRouter.patch('/:id', Validations.validateToken, (req: Request, res: Response) =>
  MatchesController.update(req, res));

MatchRouter.post('/', Validations.validateToken, validateMatch, (req: Request, res: Response) =>
  MatchesController.create(req, res));

export default MatchRouter;
