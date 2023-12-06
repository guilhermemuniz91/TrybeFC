import { ITeamsModel } from '../Interfaces/ITeamModel';
import TeamsModel from '../database/models/Teams';
import 'express-async-errors';
import ITeam from '../Interfaces/ITeam';

export default class TeamModel implements ITeamsModel {
  model = TeamsModel;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }
}
