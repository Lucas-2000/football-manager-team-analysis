import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";
import { EnumTeamGrade } from "@prisma/client";

describe("Delete team controller", () => {
  it("should be able to delete a team", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-delete-team1",
      email: "test-integration-delete-team1@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-delete-team1",
      password: "test123",
    });

    const team = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.A,
        userId: user.body.id,
      });

    const response = await request(app)
      .delete(`/teams/${team.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(201);
  });

  it("should not be able to delete a team if team don't found", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-delete-team",
      email: "test-integration-delete-team@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-delete-team",
      password: "test123",
    });

    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.A,
        userId: user.body.id,
      });

    const response = await request(app)
      .delete(`/teams/1`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    const usersToDelete = [
      "test-integration-delete-team@example.com",
      "test-integration-delete-team1@example.com",
      "test-integration-delete-team2@example.com",
    ];

    await prisma.user.deleteMany({
      where: {
        email: {
          in: usersToDelete,
        },
      },
    });
  });
});
