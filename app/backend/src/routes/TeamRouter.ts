import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const TeamRouter = Router();

TeamRouter.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

export default TeamRouter;
