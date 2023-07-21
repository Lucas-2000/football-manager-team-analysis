import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Find All Positions Controller", () => {
  it("should be able to find all positions", async () => {
    await request(app).post("/users").send({
      username: "test-integration-find-all-positions",
      email: "test-integration-find-all-positions@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-find-all-positions",
      password: "test123",
    });

    const response = await request(app)
      .get("/positions")
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(201);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-find-all-positions@example.com",
      },
    });
  });
});
