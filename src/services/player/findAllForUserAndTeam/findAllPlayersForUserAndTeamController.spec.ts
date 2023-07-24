import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";
import { EnumTeamGrade } from "@prisma/client";

describe("Find All Players for user and team Controller", () => {
  it("should be able to find all players by user and team", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-find-all-players-for-user-and-team",
      email: "test-integration-find-all-players-for-user-and-team@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-find-all-players-for-user-and-team",
      password: "test123",
    });

    const team = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        teamName: "Corinthians - SP",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.A,
        userId: user.body.id,
      });

    const response = await request(app)
      .get(`/players/${user.body.id}/${team.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(201);
  });

  it("should not be able to find all players by user and team if user not found", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-find-all-players-for-user-and-team",
      email: "test-integration-find-all-players-for-user-and-team@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-find-all-players-for-user-and-team",
      password: "test123",
    });

    const team = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        teamName: "Corinthians - SP",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.A,
        userId: user.body.id,
      });

    const response = await request(app)
      .get(`/players/1/${team.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(400);
  });

  it("should not be able to find all players by user and team if team not found", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-find-all-players-for-user-and-team",
      email: "test-integration-find-all-players-for-user-and-team@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-find-all-players-for-user-and-team",
      password: "test123",
    });

    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        teamName: "Corinthians - SP",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.A,
        userId: user.body.id,
      });

    const response = await request(app)
      .get(`/players/${user.body.id}/1`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email:
          "test-integration-find-all-players-for-user-and-team@example.com",
      },
    });
  });
});
