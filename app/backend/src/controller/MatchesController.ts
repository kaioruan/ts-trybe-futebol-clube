import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';

class MatchesController {
  constructor(private matchesServices = new MatchesServices()) { }

  public getAllMatches = async (_req: Request, res: Response) => {
    const allMatches = await this.matchesServices.getAllMatches();
    res.status(200).json(allMatches);
  };
}

export default MatchesController;
