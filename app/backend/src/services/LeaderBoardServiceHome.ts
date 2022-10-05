import Match from '../interface/Match';
import LeaderBoard from '../interface/LeaderBoard';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import ITeam from '../interface/ITeam';
import HomeMatch from '../interface/CalculeHomeMatch';
import LeaderBoardTeam from '../interface/LeaderBoardTeam';

class leaderBoardServiceHome {
  public model = MatchModel;

  public HMatches = async (id: number): Promise<Match[]> => {
    const Matches = await MatchModel.findAll({
      where: { homeTeam: id, inProgress: false },
    });
    return Matches as unknown as Match[];
  };

  public HTotalGames = async (matches: Match[]): Promise<number> => {
    const total = matches.length;
    return total;
  };

  public HGoalsInMatches = async (matches: Match[]): Promise<number> => {
    const total = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return total;
  };

  public HomeGoalsAgainst = async (matches: Match[]): Promise<number> => {
    const total = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return total;
  };

  public HomeWins = async (matches: Match[]): Promise<number> => {
    const total = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    return total;
  };

  public HomeDraws = async (matches: Match[]): Promise<number> => {
    const total = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    return total;
  };

  public HomeLosses = async (matches: Match[]): Promise<number> => {
    const total = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    return total;
  };

  public HomePoints = async (matches: Match[]): Promise<number> => {
    const total = matches.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 3;
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return total;
  };

  public GoalDifference = async (goalsFor: number, goalsAgainst: number): Promise<number> => {
    const total = goalsFor - goalsAgainst;
    return total;
  };

  public CalculeHome = async (team: ITeam): Promise<HomeMatch> => {
    const HMatches = await this.HMatches(team.id);
    const hTotalGames = await this.HTotalGames(HMatches);
    const hGlsInMatch = await this.HGoalsInMatches(HMatches);
    const hGlsAgainst = await this.HomeGoalsAgainst(HMatches);
    const homeWins = await this.HomeWins(HMatches);
    const homeDraws = await this.HomeDraws(HMatches);
    const homeLosses = await this.HomeLosses(HMatches);
    const homePoints = await this.HomePoints(HMatches);
    return {
      hTotalGames,
      hGlsInMatch,
      hGlsAgainst,
      homeWins,
      homeDraws,
      homeLosses,
      homePoints };
  };

  public LeaderBoardTeam = async (home: HomeMatch): Promise<LeaderBoardTeam> => {
    const goalDifference = await this.GoalDifference(home.hGlsInMatch, home.hGlsAgainst);
    return {
      totalPoints: home.homePoints,
      totalGames: home.hTotalGames,
      totalVictories: home.homeWins,
      totalDraws: home.homeDraws,
      totalLosses: home.homeLosses,
      goalsFavor: home.hGlsInMatch,
      goalsOwn: home.hGlsAgainst,
      goalsBalance: goalDifference,
      efficiency: `${((home.homePoints / (home.hTotalGames * 3)) * 100).toFixed(2)}` };
  };

  public LeaderBoard = async (): Promise<LeaderBoard[]> => {
    const teams = await TeamModel.findAll();
    const leaderBoard = await Promise.all(
      teams.map(async (team) => {
        const calculeH = await this.CalculeHome(team) as unknown as Match;
        const Team = await this.LeaderBoardTeam(calculeH as unknown as HomeMatch);
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

export default leaderBoardServiceHome;
