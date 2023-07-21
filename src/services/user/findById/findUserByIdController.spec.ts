import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Find user by id Controller", () => {
  it("should be able to find user by id", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-find-user",
      email: "test-integration-find-user@example.com",
      password: "test123",
    });

    const response = await request(app).get(`/users/${user.body.id}`);

    expect(response.status).toBe(201);
  });

  it("should not be able to find user by id if user not found", async () => {
    await request(app).post("/users").send({
      username: "test-integration-find-user",
      email: "test-integration-find-user@example.com",
      password: "test123",
    });

    const response = await request(app).get(`/users/1`);

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-find-user@example.com",
      },
    });
  });
});
