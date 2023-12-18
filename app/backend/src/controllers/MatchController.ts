import { Request, Response } from 'express';
import MatchesService from '../services/MatchServices';

export default class MatchesController {
  constructor(
    private MatchService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress === undefined || inProgress === '') {
      const { data } = await this.MatchService.getAllMatches();
      return res.status(200).json(data);
    }

    const { data } = await this.MatchService.getAllMatches(inProgress === 'true');
    return res.status(200).json(data);
  }

  public async update(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { data } = await this.MatchService.update(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(data);
  }

  public async finishMatches(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { data } = await this.MatchService.updateFinish(Number(id));
    return res.status(200).json(data);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { data } = await this.MatchService.create(req.body);
    return res.status(201).json(data);
  }
}
