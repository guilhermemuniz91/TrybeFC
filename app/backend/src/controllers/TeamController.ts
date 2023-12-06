import { Request, Response } from 'express';
import TeamService from '../services/TeamServices';

export default class teamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.teamService.getAllTeam();
    return res.status(200).json(serviceResponse.data);
  }
}
