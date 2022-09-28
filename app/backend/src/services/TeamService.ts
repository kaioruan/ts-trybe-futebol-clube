import ITeam from '../interface/ITeam';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  public model = TeamModel;

  public getAllTeams = async (): Promise<ITeam[]> => {
    const Teams = await this.model.findAll();
    return Teams;
  };
}

export default TeamService;
