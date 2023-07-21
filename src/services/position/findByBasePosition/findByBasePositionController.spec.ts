import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";
import {
  EnumPlayerPositionBase,
  EnumPlayerPositionRole,
  EnumRoleType,
} from "@prisma/client";

describe("Find by base position Controller", () => {
  let position: request.Response;
  let position2: request.Response;

  it("should be able to find position by base position", async () => {
    await request(app).post("/users").send({
      username: "test-integration-find-by-base-position",
      email: "test-integration-find-by-base-position@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-find-by-base-position",
      password: "test123",
    });

    position = await request(app)
      .post("/positions")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        basePosition: EnumPlayerPositionBase.Winger,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    const response = await request(app)
      .get(`/positions/${position.body.basePosition}`)
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(201);
  });

  it("should not be able to find position by base position if not found", async () => {
    await request(app).post("/users").send({
      username: "test-integration-find-by-base-position",
      email: "test-integration-find-by-base-position@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-find-by-base-position",
      password: "test123",
    });

    position2 = await request(app)
      .post("/positions")
      .set("Authorization", `Bearer ${req.body.token}`)
      .send({
        basePosition: EnumPlayerPositionBase.Winger,
        positionRole: EnumPlayerPositionRole.InvertedWinger,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      });

    const response = await request(app)
      .get(`/positions/1`)
      .set("Authorization", `Bearer ${req.body.token}`);

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

    await prisma.user.delete({
      where: {
        email: "test-integration-find-by-base-position@example.com",
      },
    });
  });
});
