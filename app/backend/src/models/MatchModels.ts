import Matches from '../database/models/Matches';
import IMatch from '../Interfaces/IMatch';
import Teams from '../database/models/Teams';

export default class MatchModel {
  model = Matches;

  async findAll(query?: boolean): Promise<IMatch[]> {
    const inProgressBolean = query === undefined ? {} : { inProgress: query };
    const dbData = await this.model.findAll({
      where: inProgressBolean,
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ] }) as unknown as IMatch[];
    return dbData.map(({
      id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam,
    }) => (
      { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }
    ));
  }

  async updateFinish(id: number): Promise<number> {
    const [affectedRows] = await this.model.update({ inProgress: false }, { where: { id } });
    return affectedRows;
  }

  async update(
    id: number,
    homeTeamGoals:
    IMatch['homeTeamGoals'],
    awayTeamGoals: IMatch['awayTeamGoals'],
  ): Promise<number> {
    const [affectedRows] = await this.model.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
    return affectedRows;
  }

  async create(data: IMatch): Promise<IMatch> {
    const dbData = await this.model.create(data);
    return dbData;
  }
}
