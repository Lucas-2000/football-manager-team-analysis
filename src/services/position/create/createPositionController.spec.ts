import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";
import {
  EnumPlayerPositionBase,
  EnumPlayerPositionRole,
  EnumRoleType,
} from "@prisma/client";

describe("Create position controller", () => {
  let position: request.Response;
  let response: request.Response;

  it("should be able to create a new position", async () => {
    position = await request(app)
      .post("/positions")
      .send({
        basePosition: EnumPlayerPositionBase.Winger,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    expect(position.status).toBe(201);
  });

  it("should not be able to create a new position if position already exists", async () => {
    response = await request(app)
      .post("/positions")
      .send({
        basePosition: EnumPlayerPositionBase.Striker,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    const test = await request(app)
      .post("/positions")
      .send({
        basePosition: EnumPlayerPositionBase.Striker,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    expect(test.status).toBe(400);
  });

  afterAll(async () => {
    const positionsToDelete = [position.body.id, response.body.id];

    await prisma.position.deleteMany({
      where: {
        id: {
          in: positionsToDelete,
        },
      },
    });
  });
});
