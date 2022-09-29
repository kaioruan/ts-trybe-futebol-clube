import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import MatchesServices from '../services/MatchesServices';

class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
    private teamService = new TeamService(),
  ) { }

  public getBySearch = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const bool = inProgress === 'true';
    const matches = await this.matchesServices.getBySearch(bool as boolean);
    res.status(200).json(matches);
  };

  public getAllMatches = async (req: Request, res: Response) => {
    if (req.query.inProgress) {
      return this.getBySearch(req, res);
    }
    const allMatches = await this.matchesServices.getAllMatches();
    res.status(200).json(allMatches);
  };

  public postMatches = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    const newMatch = await this.matchesServices.postMatches(req.body);
    if (newMatch === 'vasco') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (!newMatch) return res.status(404).json({ message: 'There is no team with such id!' });
    res.status(201).json(newMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesServices.finishMatch(id);
    res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
