import fs from "fs/promises";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import path from "path";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { DeleteUserService } from "../../user/delete/deleteUserService";
import { EnumTeamGrade } from "@prisma/client";
import { DeleteTeamService } from "../delete/deleteTeamService";
import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";

describe("Upload user avatar controller", () => {
  let user: request.Response;
  let team: request.Response;

  beforeEach(async () => {
    user = await request(app).post("/users").send({
      username: "test-integration-team-logo",
      email: "test-integration-team-logo@example.com",
      password: "test123",
    });
    team = await request(app).post("/teams").send({
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: user.body.id,
    });
  });

  it("should be able to update delete team logo", async () => {
    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads
    const tempFilePath = path.join(uploadsFolder, "teste");

    // Cria um arquivo temporário
    await fs.writeFile(tempFilePath, "conteúdo do arquivo");

    const response = await request(app)
      .post(`/teams/${team.body.id}/logo`)
      .attach("file", tempFilePath);

    expect(response.status).toBe(201);
  });

  afterEach(async () => {
    const usersRepository = new PrismaUsersRepository();
    const deleteUserService = new DeleteUserService(usersRepository);
    const teamsRepository = new PrismaTeamsRepository();
    const deleteTeamService = new DeleteTeamService(teamsRepository);

    await deleteTeamService.execute({
      id: team.body.id,
    });

    await deleteUserService.execute({
      id: user.body.id,
    });
  });
});
