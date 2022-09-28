import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamsController {
  constructor(private teamService = new TeamService()) { }

  public getAllTeams = async (_req: Request, res: Response) => {
    const allTeams = await this.teamService.getAllTeams();
    res.status(200).json(allTeams);
  };

  public getById = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const ById = await this.teamService.getById(id);
    res.status(200).json(ById);
  };
}

export default TeamsController;
