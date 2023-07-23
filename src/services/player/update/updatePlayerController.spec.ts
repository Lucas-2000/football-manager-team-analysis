import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "../../../utils/config/prisma/prismaClient";
import { EnumPlayerAttributesRange } from "../../../utils/dicts/enumPlayerAttributesRange";
import {
  EnumPlayerPositionBase,
  EnumPlayerPositionRole,
  EnumRoleType,
  EnumTeamGrade,
} from "@prisma/client";
import { app } from "../../../app";

describe("Update player controller", () => {
  let position: request.Response;

  it("should be able to update a player", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-update-player",
      email: "test-integration-update-player@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-update-player",
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

    position = await request(app)
      .post("/positions")
      .send({
        basePosition: EnumPlayerPositionBase.Winger,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    const player = await request(app)
      .post("/players")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        name: "Kevin de Bruyne",
        birthdate: "1991-08-01",
        lenght: 181,
        weight: 68,
        jersey: 17,
        positionId: position.body.id,
        teamId: team.body.id,
        userId: user.body.id,
        corners: EnumPlayerAttributesRange.Fifteen,
        crossing: EnumPlayerAttributesRange.Fifteen,
        dribbling: EnumPlayerAttributesRange.Fifteen,
        finishing: EnumPlayerAttributesRange.Fifteen,
        firstTouch: EnumPlayerAttributesRange.Fifteen,
        freeKickTaking: EnumPlayerAttributesRange.Fifteen,
        heading: EnumPlayerAttributesRange.Fifteen,
        longShots: EnumPlayerAttributesRange.Fifteen,
        longThrows: EnumPlayerAttributesRange.Fifteen,
        marking: EnumPlayerAttributesRange.Fifteen,
        passing: EnumPlayerAttributesRange.Fifteen,
        penaltyTaking: EnumPlayerAttributesRange.Fifteen,
        tackling: EnumPlayerAttributesRange.Fifteen,
        technique: EnumPlayerAttributesRange.Fifteen,
        agression: EnumPlayerAttributesRange.Fifteen,
        anticipation: EnumPlayerAttributesRange.Fifteen,
        bravery: EnumPlayerAttributesRange.Fifteen,
        composure: EnumPlayerAttributesRange.Fifteen,
        concentration: EnumPlayerAttributesRange.Fifteen,
        decisions: EnumPlayerAttributesRange.Fifteen,
        determination: EnumPlayerAttributesRange.Fifteen,
        flair: EnumPlayerAttributesRange.Fifteen,
        leadership: EnumPlayerAttributesRange.Fifteen,
        offTheBall: EnumPlayerAttributesRange.Fifteen,
        positioning: EnumPlayerAttributesRange.Fifteen,
        teamWork: EnumPlayerAttributesRange.Fifteen,
        vision: EnumPlayerAttributesRange.Fifteen,
        workRate: EnumPlayerAttributesRange.Fifteen,
        acceleration: EnumPlayerAttributesRange.Fifteen,
        agility: EnumPlayerAttributesRange.Fifteen,
        balance: EnumPlayerAttributesRange.Fifteen,
        jumpingReach: EnumPlayerAttributesRange.Fifteen,
        naturalFitness: EnumPlayerAttributesRange.Fifteen,
        pace: EnumPlayerAttributesRange.Fifteen,
        stamina: EnumPlayerAttributesRange.Fifteen,
        strenght: EnumPlayerAttributesRange.Fifteen,
      });

    const response = await request(app)
      .put(`/players/${player.body.id}`)
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        name: "Kevin de Bruyne",
        birthdate: "1991-08-01",
        lenght: 181,
        weight: 68,
        jersey: 17,
        positionId: position.body.id,
        teamId: team.body.id,
        userId: user.body.id,
        corners: EnumPlayerAttributesRange.Fifteen,
        crossing: EnumPlayerAttributesRange.Fifteen,
        dribbling: EnumPlayerAttributesRange.Fifteen,
        finishing: EnumPlayerAttributesRange.Fifteen,
        firstTouch: EnumPlayerAttributesRange.Fifteen,
        freeKickTaking: EnumPlayerAttributesRange.Fifteen,
        heading: EnumPlayerAttributesRange.Fifteen,
        longShots: EnumPlayerAttributesRange.Fifteen,
        longThrows: EnumPlayerAttributesRange.Fifteen,
        marking: EnumPlayerAttributesRange.Fifteen,
        passing: EnumPlayerAttributesRange.Fifteen,
        penaltyTaking: EnumPlayerAttributesRange.Fifteen,
        tackling: EnumPlayerAttributesRange.Fifteen,
        technique: EnumPlayerAttributesRange.Fifteen,
        agression: EnumPlayerAttributesRange.Fifteen,
        anticipation: EnumPlayerAttributesRange.Fifteen,
        bravery: EnumPlayerAttributesRange.Fifteen,
        composure: EnumPlayerAttributesRange.Fifteen,
        concentration: EnumPlayerAttributesRange.Fifteen,
        decisions: EnumPlayerAttributesRange.Fifteen,
        determination: EnumPlayerAttributesRange.Fifteen,
        flair: EnumPlayerAttributesRange.Fifteen,
        leadership: EnumPlayerAttributesRange.Fifteen,
        offTheBall: EnumPlayerAttributesRange.Fifteen,
        positioning: EnumPlayerAttributesRange.Fifteen,
        teamWork: EnumPlayerAttributesRange.Fifteen,
        vision: EnumPlayerAttributesRange.Fifteen,
        workRate: EnumPlayerAttributesRange.Fifteen,
        acceleration: EnumPlayerAttributesRange.Fifteen,
        agility: EnumPlayerAttributesRange.Fifteen,
        balance: EnumPlayerAttributesRange.Fifteen,
        jumpingReach: EnumPlayerAttributesRange.Fifteen,
        naturalFitness: EnumPlayerAttributesRange.Fifteen,
        pace: EnumPlayerAttributesRange.Fifteen,
        stamina: EnumPlayerAttributesRange.Fifteen,
        strenght: EnumPlayerAttributesRange.Fifteen,
      });

    expect(response.status).toBe(201);
  });
  it("should not be able to update a player if player not found", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-update-player",
      email: "test-integration-update-player@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-update-player",
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

    position = await request(app)
      .post("/positions")
      .send({
        basePosition: EnumPlayerPositionBase.Winger,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    await request(app)
      .post("/players")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        name: "Kevin de Bruyne",
        birthdate: "1991-08-01",
        lenght: 181,
        weight: 68,
        jersey: 17,
        positionId: position.body.id,
        teamId: team.body.id,
        userId: user.body.id,
        corners: EnumPlayerAttributesRange.Fifteen,
        crossing: EnumPlayerAttributesRange.Fifteen,
        dribbling: EnumPlayerAttributesRange.Fifteen,
        finishing: EnumPlayerAttributesRange.Fifteen,
        firstTouch: EnumPlayerAttributesRange.Fifteen,
        freeKickTaking: EnumPlayerAttributesRange.Fifteen,
        heading: EnumPlayerAttributesRange.Fifteen,
        longShots: EnumPlayerAttributesRange.Fifteen,
        longThrows: EnumPlayerAttributesRange.Fifteen,
        marking: EnumPlayerAttributesRange.Fifteen,
        passing: EnumPlayerAttributesRange.Fifteen,
        penaltyTaking: EnumPlayerAttributesRange.Fifteen,
        tackling: EnumPlayerAttributesRange.Fifteen,
        technique: EnumPlayerAttributesRange.Fifteen,
        agression: EnumPlayerAttributesRange.Fifteen,
        anticipation: EnumPlayerAttributesRange.Fifteen,
        bravery: EnumPlayerAttributesRange.Fifteen,
        composure: EnumPlayerAttributesRange.Fifteen,
        concentration: EnumPlayerAttributesRange.Fifteen,
        decisions: EnumPlayerAttributesRange.Fifteen,
        determination: EnumPlayerAttributesRange.Fifteen,
        flair: EnumPlayerAttributesRange.Fifteen,
        leadership: EnumPlayerAttributesRange.Fifteen,
        offTheBall: EnumPlayerAttributesRange.Fifteen,
        positioning: EnumPlayerAttributesRange.Fifteen,
        teamWork: EnumPlayerAttributesRange.Fifteen,
        vision: EnumPlayerAttributesRange.Fifteen,
        workRate: EnumPlayerAttributesRange.Fifteen,
        acceleration: EnumPlayerAttributesRange.Fifteen,
        agility: EnumPlayerAttributesRange.Fifteen,
        balance: EnumPlayerAttributesRange.Fifteen,
        jumpingReach: EnumPlayerAttributesRange.Fifteen,
        naturalFitness: EnumPlayerAttributesRange.Fifteen,
        pace: EnumPlayerAttributesRange.Fifteen,
        stamina: EnumPlayerAttributesRange.Fifteen,
        strenght: EnumPlayerAttributesRange.Fifteen,
      });

    const response = await request(app)
      .put(`/players/1`)
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        name: "Kevin de Bruyne",
        birthdate: "1991-08-01",
        lenght: 181,
        weight: 68,
        jersey: 17,
        positionId: position.body.id,
        teamId: team.body.id,
        userId: user.body.id,
        corners: EnumPlayerAttributesRange.Fifteen,
        crossing: EnumPlayerAttributesRange.Fifteen,
        dribbling: EnumPlayerAttributesRange.Fifteen,
        finishing: EnumPlayerAttributesRange.Fifteen,
        firstTouch: EnumPlayerAttributesRange.Fifteen,
        freeKickTaking: EnumPlayerAttributesRange.Fifteen,
        heading: EnumPlayerAttributesRange.Fifteen,
        longShots: EnumPlayerAttributesRange.Fifteen,
        longThrows: EnumPlayerAttributesRange.Fifteen,
        marking: EnumPlayerAttributesRange.Fifteen,
        passing: EnumPlayerAttributesRange.Fifteen,
        penaltyTaking: EnumPlayerAttributesRange.Fifteen,
        tackling: EnumPlayerAttributesRange.Fifteen,
        technique: EnumPlayerAttributesRange.Fifteen,
        agression: EnumPlayerAttributesRange.Fifteen,
        anticipation: EnumPlayerAttributesRange.Fifteen,
        bravery: EnumPlayerAttributesRange.Fifteen,
        composure: EnumPlayerAttributesRange.Fifteen,
        concentration: EnumPlayerAttributesRange.Fifteen,
        decisions: EnumPlayerAttributesRange.Fifteen,
        determination: EnumPlayerAttributesRange.Fifteen,
        flair: EnumPlayerAttributesRange.Fifteen,
        leadership: EnumPlayerAttributesRange.Fifteen,
        offTheBall: EnumPlayerAttributesRange.Fifteen,
        positioning: EnumPlayerAttributesRange.Fifteen,
        teamWork: EnumPlayerAttributesRange.Fifteen,
        vision: EnumPlayerAttributesRange.Fifteen,
        workRate: EnumPlayerAttributesRange.Fifteen,
        acceleration: EnumPlayerAttributesRange.Fifteen,
        agility: EnumPlayerAttributesRange.Fifteen,
        balance: EnumPlayerAttributesRange.Fifteen,
        jumpingReach: EnumPlayerAttributesRange.Fifteen,
        naturalFitness: EnumPlayerAttributesRange.Fifteen,
        pace: EnumPlayerAttributesRange.Fifteen,
        stamina: EnumPlayerAttributesRange.Fifteen,
        strenght: EnumPlayerAttributesRange.Fifteen,
      });

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-update-player@example.com",
      },
    });

    await prisma.position.delete({
      where: {
        id: position.body.id,
      },
    });
  });
});
