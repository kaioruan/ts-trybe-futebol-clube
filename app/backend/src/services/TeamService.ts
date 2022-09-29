import ITeam from '../interface/ITeam';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  public model = TeamModel;

  public getAllTeams = async (): Promise<ITeam[]> => {
    const Teams = await this.model.findAll();
    return Teams;
  };

  public getById = async (id: string): Promise<ITeam> => {
    const getId = await this.model.findByPk(id);
    if (!getId) return null as unknown as ITeam;
    return getId as ITeam;
  };
}

export default TeamService;
