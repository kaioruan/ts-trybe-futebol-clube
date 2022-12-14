import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardServiceHome from '../services/LeaderBoardServiceHome';
import LeaderBoardServiceAway from '../services/LeaderBoardServiceAway';

// const ERROR_500 = 'Internal Server Error';

class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
    private leaderBoardServiceHome = new LeaderBoardServiceHome(),
    private leaderBoardServiceAway = new LeaderBoardServiceAway(),
  ) {}

  public getLeaderBoard = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.leaderBoardService.LeaderBoard();
    return res.status(200).json(result.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn + a.goalsOwn));
  };

  public getLeaderBoardHome = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.leaderBoardServiceHome.LeaderBoard();
    return res.status(200).json(result);
  };

  public getLeaderBoardAway = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.leaderBoardServiceAway.LeaderBoard();
    return res.status(200).json(result);
  };
}

export default LeaderBoardController;
