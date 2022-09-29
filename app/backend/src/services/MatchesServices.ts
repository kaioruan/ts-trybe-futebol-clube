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

  public postMatches = async (body: postMatch): Promise<Match> => {
    const newMatch = await this.model.create({ ...body, inProgress: true });

    // return { newMatch.id, newMatch.homeTeam, newMatch.homeTeamGoals, newMatch.awayTeam, newMatch.awayTeamGoals, newMatch.inProgress };
    const { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = newMatch;
    return { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } as unknown as Match;
  };
}

export default TeamService;
