import MatchModel from '../models/MatchModels';
import IMatches from '../Interfaces/IMatch';
import { ServiceMessage, ServiceResponse } from '../Interfaces/IServiceResponse';

export default class MatchesService {
  constructor(
    private MatchesModel = new MatchModel(),
  ) {}

  public async getAllMatches(query?: boolean): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.MatchesModel.findAll(query);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateFinish(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.MatchesModel.updateFinish(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.MatchesModel.update(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async create(data: IMatches): Promise<ServiceResponse<IMatches>> {
    const matchData = await this.MatchesModel.create({ ...data, inProgress: true });
    return { status: 'SUCCESSFUL', data: matchData };
  }
}
