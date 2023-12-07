import ITeam from './ITeam';

export interface ITeamsModel {
  findAll(): Promise<ITeam[]>
  FindByPk(id: ITeam['id']): Promise<ITeam | null>
}
