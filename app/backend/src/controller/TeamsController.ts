import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamsController {
  constructor(private teamService = new TeamService()) { }

  public getAllTeams = async (_req: Request, res: Response) => {
    const allTeams = await this.teamService.getAllTeams();
    res.status(200).json(allTeams);
  };
}

export default TeamsController;
