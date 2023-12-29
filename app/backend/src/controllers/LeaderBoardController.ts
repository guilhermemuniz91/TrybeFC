import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardServices';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async getHome(req: Request, res: Response): Promise<Response> {
    const data = await this.leaderBoardService.homeLeaderBoard();
    return res.status(200).json(data);
  }
}
