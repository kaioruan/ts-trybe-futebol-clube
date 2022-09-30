// import { StatusCodes } from 'http-status-codes';
import Match from '../interface/Match';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import postMatch from '../interface/postMatch';

class TeamService {
  public model = MatchModel;

  public getAllMatches = async (): Promise<Match[]> => {
    const Matches = await this.model.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return Matches as unknown as Match[];
  };

  public getBySearch = async (q: boolean): Promise<Match[]> => {
    const Matches = await this.model.findAll({ where: { inProgress: q },
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return Matches as unknown as Match[];
  };

  public postMatches = async (body: postMatch): Promise<Match | string> => {
    const getId = await this.model.findByPk(body.homeTeam);
    const secondId = await this.model.findByPk(body.awayTeam);
    if (!getId || !secondId) {
      return 'vasco';
    }
    const newMatch = await this.model.create({ ...body, inProgress: true });
    if (!newMatch) return null as unknown as Match;
    const { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = newMatch;
    return { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } as unknown as Match;
  };

  public finishMatch = async (id: string): Promise<void> => {
    await this.model.update({ inProgress: false }, { where: { id } });
  };

  public updateMatch = async (
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Match> => {
    const match = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return match as unknown as Match;
  };
}

export default TeamService;
