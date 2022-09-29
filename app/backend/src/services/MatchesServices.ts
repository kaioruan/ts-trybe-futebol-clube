import Match from '../interface/Match';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

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
}

export default TeamService;
