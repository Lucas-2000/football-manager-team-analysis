import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { EnumTeamGrade } from "@prisma/client";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Create team Controller", () => {
  it("should be able to create a team", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-create-team",
      email: "test-integration-create-team@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-create-team",
      password: "test123",
    });

    const response = await request(app)
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

    expect(response.status).toBe(201);
  });

  it("should not be able to create a team if team already exists for the user", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-create-team",
      email: "test-integration-create-team@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-create-team",
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

    expect(response.status).toBe(400);
  });

  it("should not be able to create a team if user not found", async () => {
    await request(app).post("/users").send({
      username: "test-integration-create-team",
      email: "test-integration-create-team@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-create-team",
      password: "test123",
    });

    const response = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.A,
        userId: "user.body.id",
      });

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-create-team@example.com",
      },
    });
  });
});
