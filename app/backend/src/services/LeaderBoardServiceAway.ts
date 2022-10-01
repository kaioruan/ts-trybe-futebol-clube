import Match from '../interface/Match';
import LeaderBoard from '../interface/LeaderBoard';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import ITeam from '../interface/ITeam';
import AwayMatch from '../interface/CalculeAwayMatch';
import LeaderBoardTeam from '../interface/LeaderBoardTeam';

class LeaderBoardServiceAway {
  public model = MatchModel;

  public AMatches = async (id: number): Promise<Match[]> => {
    const Matches = await MatchModel.findAll({
      where: { awayTeam: id, inProgress: false },
    });
    return Matches as unknown as Match[];
  };

  public AwayTotalGames = async (matches: Match[]): Promise<number> => {
    const total = matches.length;
    return total;
  };

  public AwayGoalsInMatches = async (matches: Match[]): Promise<number> => {
    const total = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return total;
  };

  public AwayGoalsAgainst = async (matches: Match[]): Promise<number> => {
    const total = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return total;
  };

  public AwayWins = async (matches: Match[]): Promise<number> => {
    const total = matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
    return total;
  };

  public AwayDraws = async (matches: Match[]): Promise<number> => {
    const total = matches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
    return total;
  };

  public AwayLosses = async (matches: Match[]): Promise<number> => {
    const total = matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
    return total;
  };

  public AwayPoints = async (matches: Match[]): Promise<number> => {
    const total = matches.reduce((acc, match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) return acc + 3;
      if (match.awayTeamGoals === match.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return total;
  };

  public GoalsInMatches = async (home: number, away: number): Promise<number> => {
    const total = home + away;
    return total;
  };

  public GoalsAgainst = async (home: number, away: number): Promise<number> => {
    const total = home + away;
    return total;
  };

  public Wins = async (home: number, away: number): Promise<number> => {
    const total = home + away;
    return total;
  };

  public Draws = async (home: number, away: number): Promise<number> => {
    const total = home + away;
    return total;
  };

  public Losses = async (home: number, away: number): Promise<number> => {
    const total = home + away;
    return total;
  };

  public Points = async (home: number, away: number): Promise<number> => {
    const total = home + away;
    return total;
  };

  public GoalDifference = async (goalsFor: number, goalsAgainst: number): Promise<number> => {
    const total = goalsFor - goalsAgainst;
    return total;
  };

  public CalculeAway = async (team: ITeam): Promise<AwayMatch> => {
    const aMatches = await this.AMatches(team.id);
    const awayTotalGames = await this.AwayTotalGames(aMatches);
    const aGlsInMatch = await this.AwayGoalsInMatches(aMatches);
    const awayGoalsAgainst = await this.AwayGoalsAgainst(aMatches);
    const awayWins = await this.AwayWins(aMatches);
    const awayDraws = await this.AwayDraws(aMatches);
    const awayLosses = await this.AwayLosses(aMatches);
    const awayPoints = await this.AwayPoints(aMatches);
    return {
      awayTotalGames,
      aGlsInMatch,
      awayGoalsAgainst,
      awayWins,
      awayDraws,
      awayLosses,
      awayPoints };
  };

  public LeaderBoardTeam = async (away:AwayMatch): Promise<LeaderBoardTeam> => {
    const goalDifference = await this.GoalDifference(away.aGlsInMatch, away.awayGoalsAgainst);
    return {
      totalPoints: away.awayPoints,
      totalGames: away.awayTotalGames,
      totalVictories: away.awayWins,
      totalDraws: away.awayDraws,
      totalLosses: away.awayLosses,
      goalsFavor: away.aGlsInMatch,
      goalsOwn: away.awayGoalsAgainst,
      goalsBalance: goalDifference,
      efficiency: `${((away.awayPoints / (away.awayTotalGames * 3)) * 100).toFixed(2)}` };
  };

  public LeaderBoard = async (): Promise<LeaderBoard[]> => {
    const teams = await TeamModel.findAll();
    const leaderBoard = await Promise.all(
      teams.map(async (team) => {
        const calculeA = await this.CalculeAway(team as ITeam);
        const Team = await this.LeaderBoardTeam(calculeA);
        return {
          name: team.teamName,
          ...Team,
        };
      }),
    ); return leaderBoard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn + a.goalsOwn) as unknown as LeaderBoard[];
  };
}
export default LeaderBoardServiceAway;
