import { Team, TeamProps } from "../../../entities/team";
import { UsersRepository } from "../../../repositories/usersRepository";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";
import { TeamsRepository } from "./../../../repositories/teamsRepository";

interface UpdateTeamRequest {
  id: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: EnumTeamGrade;
  userId: string;
}

type UpdateTeamResponse = TeamProps;

export class UpdateTeamService {
  constructor(
    private teamsRepository: TeamsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    teamName,
    teamLocalization,
    teamCountry,
    teamLeague,
    teamGrade,
    userId,
  }: UpdateTeamRequest): Promise<UpdateTeamResponse> {
    const verifyIndex = await this.teamsRepository.findIndex(id);

    if (verifyIndex < 0) throw new Error("Team not found!");

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found!");

    if ((await this.teamsRepository.checkTeamGradeInterval(teamGrade)) == false)
      throw new Error("Incorrect Team Grade Interval!");

    const team = new Team({
      id,
      teamName,
      teamLocalization,
      teamCountry,
      teamLeague,
      teamGrade,
      userId,
    });

    await this.teamsRepository.update(team);

    return team.getSummary();
  }
}
