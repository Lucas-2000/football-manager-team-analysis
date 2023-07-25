import { afterEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";
import { EnumTeamGrade } from "@prisma/client";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Generate Report Players Controller", () => {
  it("should be able to generate a report player", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-generate-report-player",
      email: "test-integration-generate-report-player@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-generate-report-player",
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
      .get(`/reports/players/${user.body.id}/${team.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`);

    console.log(response.body);

    expect(response.status).toBe(200);
  });

  it("should not be able to generate a report player if user not found", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-generate-report-player",
      email: "test-integration-generate-report-player@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-generate-report-player",
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
      .get(`/reports/players/1/${team.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`);

    console.log(response.body);

    expect(response.status).toBe(400);
  });

  it("should not be able to generate a report player if team not found", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-generate-report-player",
      email: "test-integration-generate-report-player@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-generate-report-player",
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
      .get(`/reports/players/${user.body.id}/1`)
      .set("Authorization", `Bearer ${req.body.token}`);

    console.log(response.body);

    expect(response.status).toBe(400);
  });
});

afterEach(async () => {
  await prisma.user.delete({
    where: {
      email: "test-integration-generate-report-player@example.com",
    },
  });
});
