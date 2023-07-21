import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Find All Teams Controller", () => {
  it("should be able to find all teams", async () => {
    await request(app).post("/users").send({
      username: "test-integration-find-all-teams",
      email: "test-integration-find-all-teams@example.com",
      password: "test123",
    });

    const req = await request(app).post("/users/auth").send({
      username: "test-integration-find-all-teams",
      password: "test123",
    });

    const response = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${req.body.token}`);

    expect(response.status).toBe(201);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-find-all-teams@example.com",
      },
    });
  });
});
