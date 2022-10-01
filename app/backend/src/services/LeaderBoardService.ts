// import sequelize = require('sequelize');
// import Match from '../interface/Match';
import Match from '../interface/Match';
import LeaderBoard from '../interface/LeaderBoard';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import ITeam from '../interface/ITeam';
import HomeMatch from '../interface/CalculeHomeMatch';
import AwayMatch from '../interface/CalculeAwayMatch';
import LeaderBoardTeam from '../interface/LeaderBoardTeam';

class LeaderBoardService {
  public model = MatchModel;

  public HMatches = async (id: number): Promise<Match[]> => {
    const Matches = await MatchModel.findAll({
      where: { homeTeam: id, inProgress: false },
    });
    return Matches as unknown as Match[];
  };

  public AMatches = async (id: number): Promise<Match[]> => {
    const Matches = await MatchModel.findAll({
      where: { awayTeam: id, inProgress: false },
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

  public TotalGames = async (home: number, away: number): Promise<number> => {
    const total = home + away;
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

  public LeaderBoardTeam = async (home: HomeMatch, away:AwayMatch): Promise<LeaderBoardTeam> => {
    const totalGames = await this.TotalGames(home.hTotalGames, away.awayTotalGames);
    const goalsInMatches = await this.GoalsInMatches(home.hGlsInMatch, away.aGlsInMatch);
    const goalsAgainst = await this.GoalsAgainst(home.hGlsAgainst, away.awayGoalsAgainst);
    const wins = await this.Wins(home.homeWins, away.awayWins);
    const draws = await this.Draws(home.homeDraws, away.awayDraws);
    const losses = await this.Losses(home.homeLosses, away.awayLosses);
    const points = await this.Points(home.homePoints, away.awayPoints);
    const goalDifference = await this.GoalDifference(goalsInMatches, goalsAgainst);
    return {
      totalPoints: points,
      totalGames,
      totalVictories: wins,
      totalDraws: draws,
      totalLosses: losses,
      goalsFavor: goalsInMatches,
      goalsOwn: goalsAgainst,
      goalsBalance: goalDifference,
      efficiency: `${((points / (totalGames * 3)) * 100).toFixed(2)}` };
  };

  public LeaderBoard = async (): Promise<LeaderBoard[]> => {
    const teams = await TeamModel.findAll();
    const leaderBoard = await Promise.all(
      teams.map(async (team) => {
        const calculeH = await this.CalculeHome(team) as unknown as Match;
        const calculeA = await this.CalculeAway(team as ITeam);
        const Team = await this.LeaderBoardTeam(calculeH as unknown as HomeMatch, calculeA);
        return {
          // id: team.id,
          name: team.teamName,
          ...Team,
        };
      }),
    ); return leaderBoard as unknown as LeaderBoard[];
  };
}
export default LeaderBoardService;
