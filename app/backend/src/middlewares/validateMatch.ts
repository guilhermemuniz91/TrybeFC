import { Request, Response, NextFunction } from 'express';
import TeamsModel from '../database/models/SequelizeTeams';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const homeTeam = await TeamsModel.findByPk(homeTeamId);
  const awayTeam = await TeamsModel.findByPk(awayTeamId);

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default validateMatch;
