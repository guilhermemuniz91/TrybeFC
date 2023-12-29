import sequelize = require('sequelize');
import TeamModel from '../database/models/SequelizeTeams';
import MatchModel from '../database/models/SequelizeMatches';
import { ILeaderboard, ISequelizeLeaderboard } from '../Interfaces/ILeaderBoard';

export default class LeaderBoardService {
  constructor(
    private matchModel = MatchModel,
    private teamModel = TeamModel,
  ) { }

  public async getHome() {
    const allMatchs = await this.matchModel.findAll({
      include: [{ model: TeamModel, as: 'homeTeam', attributes: ['teamName'] }],
      attributes: [
        [sequelize.literal('COUNT(matches.id)'), 'totalGames'],
        [sequelize.literal(`SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalVictories'],
        [sequelize.literal(`SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalLosses'],
        [sequelize.literal(`SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalDraws'],
        [sequelize.literal('SUM(matches.home_team_goals)'), 'goalsFavor'],
        [sequelize.literal('SUM(matches.away_team_goals)'), 'goalsOwn'],
      ],
      where: { inProgress: false },
      group: 'home_team_id',
    });
    return allMatchs.map(({ dataValues }) => dataValues) as unknown as ISequelizeLeaderboard[];
  }

  public async homeLeaderBoard(): Promise<ILeaderboard[]> {
    const leaderBoard = (await this.getHome()).map((match) => ({
      name: match.homeTeam.teamName,
      totalPoints: Number(match.totalVictories) * 3 + Number(match.totalDraws),
      totalGames: Number(match.totalGames),
      totalVictories: Number(match.totalVictories),
      totalLosses: Number(match.totalLosses),
      totalDraws: Number(match.totalDraws),
      goalsFavor: Number(match.goalsFavor),
      goalsOwn: Number(match.goalsOwn),
      goalsBalance: Number(match.goalsFavor) - Number(match.goalsOwn),
      efficiency: LeaderBoardService
        .efficiency(match.totalGames, match.totalVictories, match.totalDraws) }));
    return leaderBoard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
  }

  static efficiency(
    totalGames: number,
    totalVictories: number,
    totalDraws: number,
  ): number {
    return Number((((
      Number(totalVictories) * 3 + Number(totalDraws)) / (
      Number(totalGames) * 3)) * 100).toFixed(2));
  }
}
