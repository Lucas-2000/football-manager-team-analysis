import { EnumTeamGrade } from "@prisma/client";
import { Team } from "../../entities/team";
import { prisma } from "../../prisma/prismaClient";
import { TeamsRepository } from "../teamsRepository";
import { v4 as uuid } from "uuid";

export class PrismaTeamsRepository implements TeamsRepository {
  async create({
    teamName,
    teamLocalization,
    teamCountry,
    teamGrade,
    teamLeague,
    teamLogo,
  }: Team): Promise<void> {
    await prisma.team.create({
      data: {
        id: uuid(),
        teamName,
        teamLocalization,
        teamCountry,
        teamGrade,
        teamLeague,
        teamLogo,
      },
    });
  }

  async verifyExisting(teamName: string): Promise<boolean> {
    const team = await prisma.team.findFirst({
      where: {
        teamName,
      },
    });

    return !!team;
  }

  async findAll(): Promise<Team[]> {
    const teams = await prisma.team.findMany();

    return teams.map(
      (team) =>
        new Team({
          id: team.id,
          teamName: team.teamName,
          teamLocalization: team.teamLocalization,
          teamCountry: team.teamCountry,
          teamLeague: team.teamLeague,
          teamGrade: team.teamGrade,
          teamLogo: team.teamLogo,
        })
    );
  }

  async findById(teamId: string): Promise<Team | undefined> {
    const team = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (team === null) return;

    return new Team({
      id: team.id,
      teamName: team.teamName,
      teamLocalization: team.teamLocalization,
      teamCountry: team.teamCountry,
      teamLeague: team.teamLeague,
      teamGrade: team.teamGrade,
      teamLogo: team.teamLogo,
    });
  }

  async findIndex(teamId: string): Promise<number> {
    const teams = await prisma.team.findMany();
    const teamIndex = teams.findIndex((team) => team.id === teamId);

    if (teamIndex < 0) return -1;

    return teamIndex;
  }

  async update({
    id,
    teamName,
    teamLocalization,
    teamCountry,
    teamGrade,
    teamLeague,
    teamLogo,
  }: Team): Promise<void> {
    await prisma.team.update({
      where: { id },
      data: {
        teamName,
        teamLocalization,
        teamCountry,
        teamGrade,
        teamLeague,
        teamLogo,
      },
    });
  }

  async delete(teamId: string): Promise<void> {
    await prisma.team.delete({ where: { id: teamId } });
  }

  async checkTeamGradeInterval(teamGrade: EnumTeamGrade): Promise<boolean> {
    return ["A", "B", "C", "D", "E"].includes(teamGrade);
  }
}
