import { PlayerProps } from "../../../entities/player";
import { PlayersRepository } from "../../../repositories/playersRepository";
import { TeamsRepository } from "../../../repositories/teamsRepository";
import { UsersRepository } from "../../../repositories/usersRepository";
import ExcelJS from "exceljs";

interface GenerateWorksheetServiceRequest {
  userId: string;
  teamId: string;
}

type GenerateWorksheetServiceResponse = string;

export class GenerateWorksheetService {
  constructor(
    private playersRepository: PlayersRepository,
    private usersRepository: UsersRepository,
    private teamsRepository: TeamsRepository
  ) {}

  async execute({
    userId,
    teamId,
  }: GenerateWorksheetServiceRequest): Promise<GenerateWorksheetServiceResponse> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found");

    const teamExists = await this.teamsRepository.findById(teamId);

    if (!teamExists) throw new Error("Team not found");

    const players = await this.playersRepository.findAllPlayersForUserAndTeam(
      userExists.id as string,
      teamExists.id as string
    );

    const playerSummaries: PlayerProps[] = players.map((player) =>
      player.getSummary()
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${teamExists.teamName}`);

    // Colunas da planilha
    worksheet.columns = [
      { header: "name", key: "name", width: 30 },
      { header: "birthdate", key: "birthdate", width: 15 },
      { header: "lenght", key: "lenght", width: 10 },
      { header: "weight", key: "weight", width: 10 },
      { header: "jersey", key: "jersey", width: 10 },
      { header: "corners", key: "corners", width: 10 },
      { header: "crossing", key: "crossing", width: 10 },
      { header: "dribbling", key: "dribbling", width: 10 },
      { header: "finishing", key: "finishing", width: 10 },
      { header: "firstTouch", key: "firstTouch", width: 10 },
      { header: "freeKickTaking", key: "freeKickTaking", width: 10 },
      { header: "heading", key: "heading", width: 10 },
      { header: "longShots", key: "longShots", width: 10 },
      { header: "longThrows", key: "longThrows", width: 10 },
      { header: "marking", key: "marking", width: 10 },
      { header: "passing", key: "passing", width: 10 },
      { header: "penaltyTaking", key: "penaltyTaking", width: 10 },
      { header: "tackling", key: "tackling", width: 10 },
      { header: "technique", key: "technique", width: 10 },
      { header: "agression", key: "agression", width: 10 },
      { header: "anticipation", key: "anticipation", width: 10 },
      { header: "bravery", key: "bravery", width: 10 },
      { header: "composure", key: "composure", width: 10 },
      { header: "concentration", key: "concentration", width: 10 },
      { header: "decisions", key: "decisions", width: 10 },
      { header: "determination", key: "determination", width: 10 },
      { header: "flair", key: "flair", width: 10 },
      { header: "leadership", key: "leadership", width: 10 },
      { header: "offTheBall", key: "offTheBall", width: 10 },
      { header: "positioning", key: "positioning", width: 10 },
      { header: "teamWork", key: "teamWork", width: 10 },
      { header: "vision", key: "vision", width: 10 },
      { header: "workRate", key: "workRate", width: 10 },
      { header: "acceleration", key: "acceleration", width: 10 },
      { header: "agility", key: "agility", width: 10 },
      { header: "balance", key: "balance", width: 10 },
      { header: "jumpingReach", key: "jumpingReach", width: 10 },
      { header: "naturalFitness", key: "naturalFitness", width: 10 },
      { header: "pace", key: "pace", width: 10 },
      { header: "stamina", key: "stamina", width: 10 },
      { header: "strenght", key: "strenght", width: 10 },
    ];

    // Adicionando os jogadores nas linhas
    playerSummaries.forEach((player) => {
      worksheet.addRow({
        name: player.name,
        birthdate: player.birthdate,
        lenght: player.lenght,
        weight: player.weight,
        jersey: player.jersey,
        corners: player.corners,
        crossing: player.crossing,
        dribbling: player.dribbling,
        finishing: player.finishing,
        firstTouch: player.firstTouch,
        freeKickTaking: player.freeKickTaking,
        heading: player.heading,
        longShots: player.longShots,
        longThrows: player.longThrows,
        marking: player.marking,
        passing: player.passing,
        penaltyTaking: player.penaltyTaking,
        tackling: player.tackling,
        technique: player.technique,
        agression: player.agression,
        anticipation: player.anticipation,
        bravery: player.bravery,
        composure: player.composure,
        concentration: player.concentration,
        decisions: player.decisions,
        determination: player.determination,
        flair: player.flair,
        leadership: player.leadership,
        offTheBall: player.offTheBall,
        positioning: player.positioning,
        teamWork: player.teamWork,
        vision: player.vision,
        workRate: player.workRate,
        acceleration: player.acceleration,
        agility: player.agility,
        balance: player.balance,
        jumpingReach: player.jumpingReach,
        naturalFitness: player.naturalFitness,
        pace: player.pace,
        stamina: player.stamina,
        strenght: player.strenght,
      });
    });

    const filename = `${new Date().getTime()}_dados_exportados_${userId}.xlsx`;
    await workbook.xlsx.writeFile(filename);

    return filename;
  }
}
