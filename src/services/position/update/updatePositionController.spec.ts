import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";
import {
  EnumPlayerPositionBase,
  EnumPlayerPositionRole,
  EnumRoleType,
} from "@prisma/client";

describe("Update position controller", () => {
  let position: request.Response;
  let position2: request.Response;

  it("should be able to update a position", async () => {
    position = await request(app)
      .post("/positions")
      .send({
        basePosition: EnumPlayerPositionBase.Winger,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    const response = await request(app)
      .put(`/positions/${position.body.id}`)
      .send({
        basePosition: EnumPlayerPositionBase.Winger,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to update a position if position not found", async () => {
    position2 = await request(app)
      .post("/positions")
      .send({
        basePosition: EnumPlayerPositionBase.Winger,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    const response = await request(app)
      .put(`/positions/1`)
      .send({
        basePosition: EnumPlayerPositionBase.Winger,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    const positionsToDelete = [position.body.id, position2.body.id];

    await prisma.position.deleteMany({
      where: {
        id: {
          in: positionsToDelete,
        },
      },
    });
  });
});
