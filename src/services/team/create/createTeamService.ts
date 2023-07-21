import { Team, TeamProps } from "../../../entities/team";
import { TeamsRepository } from "../../../repositories/teamsRepository";
import { UsersRepository } from "../../../repositories/usersRepository";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";
import { v4 as uuid } from "uuid";

interface CreateTeamRequest {
  id?: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: EnumTeamGrade;
  teamLogo?: string;
  userId: string;
}

type CreateTeamResponse = TeamProps;

export class CreateTeamService {
  constructor(
    private teamsRepository: TeamsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    teamName,
    teamLocalization,
    teamCountry,
    teamGrade,
    teamLeague,
    teamLogo,
    userId,
  }: CreateTeamRequest): Promise<CreateTeamResponse> {
    const verifyExisting = await this.teamsRepository.verifyExisting(
      teamName,
      userId
    );

    if (verifyExisting)
      throw new Error(`Team ${teamName} already exists for this user!`);

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found!");

    if ((await this.teamsRepository.checkTeamGradeInterval(teamGrade)) == false)
      throw new Error("Incorrect Team Grade Interval!");

    const team = new Team({
      id: id ?? uuid(),
      teamName,
      teamLocalization,
      teamCountry,
      teamGrade,
      teamLeague,
      teamLogo,
      userId,
    });

    await this.teamsRepository.create(team);

    return team.getSummary();
  }
}
