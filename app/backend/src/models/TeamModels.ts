import { ITeamsModel } from '../Interfaces/ITeamModel';
import TeamsModel from '../database/models/SequelizeTeams';
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

  async FindByPk(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;
    const { teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
