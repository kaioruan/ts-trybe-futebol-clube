import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';

class MatchesController {
  constructor(private matchesServices = new MatchesServices()) { }

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
    const newMatch = await this.matchesServices.postMatches(req.body);
    res.status(201).json(newMatch);
  };
}

export default MatchesController;
