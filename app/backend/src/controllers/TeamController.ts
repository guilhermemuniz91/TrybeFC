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

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getTeamById(Number(id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(404).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
