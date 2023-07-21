import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";
import { EnumTeamGrade } from "@prisma/client";

describe("Update team controller", () => {
  it("should be able to update a team", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-update-team",
      email: "test-integration-update-team@example.com",
      password: "test123",
    });

    const team = await request(app).post(`/teams`).send({
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: user.body.id,
    });

    const response = await request(app).put(`/teams/${team.body.id}`).send({
      teamName: "Corinthians - SP",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: user.body.id,
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to update a team if team name already exists for the user", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-update-team",
      email: "test-integration-update-team@example.com",
      password: "test123",
    });

    await request(app).post(`/teams`).send({
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: user.body.id,
    });

    const team = await request(app).post(`/teams`).send({
      teamName: "Flamengo",
      teamLocalization: "RJ",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: user.body.id,
    });

    const response = await request(app).put(`/teams/${team.body.id}`).send({
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: user.body.id,
    });

    expect(response.status).toBe(400);
  });

  it("should not be able to update a team if user not found", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-update-team",
      email: "test-integration-update-team@example.com",
      password: "test123",
    });

    const team = await request(app).post(`/teams`).send({
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: user.body.id,
    });

    const response = await request(app).put(`/teams/${team.body.id}`).send({
      teamName: "Corinthians - SP",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "user.body.id",
    });

    expect(response.status).toBe(400);
  });

  it("should not be able to update a team if team not found", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-update-team",
      email: "test-integration-update-team@example.com",
      password: "test123",
    });

    await request(app).post(`/teams`).send({
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: user.body.id,
    });

    const response = await request(app).put(`/teams/1`).send({
      teamName: "Corinthians - SP",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: user.body.id,
    });

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-update-team@example.com",
      },
    });
  });
});
