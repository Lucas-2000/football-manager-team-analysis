import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";
import { EnumTeamGrade } from "@prisma/client";

describe("Find team by id Controller", () => {
  it("should be able to find team by id", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-find-team",
      email: "test-integration-find-team@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-find-team",
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
      .get(`/teams/${team.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(201);
  });

  it("should not be able to find team by id if team not found", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-find-team",
      email: "test-integration-find-team@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-find-team",
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
      .get(`/teams/1`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-find-team@example.com",
      },
    });
  });
});
