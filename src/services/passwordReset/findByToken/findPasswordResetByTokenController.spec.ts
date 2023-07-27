import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Find password reset by token controller", () => {
  it("should be able to find a password reset by token", async () => {
    await request(app).post("/users").send({
      username: "test-integration-password-reset-find-by-token",
      email: "test-integration-password-reset-find-by-token@example.com",
      password: "test123",
    });

    const token = await request(app).post("/users/reset-password").send({
      email: "test-integration-password-reset-find-by-token@example.com",
    });

    const response = await request(app).get(
      `/users/find-by-id/${token.body.token}`
    );

    expect(response.status).toBe(201);
  });

  it("should not be able to find a password reset by token if token not found", async () => {
    await request(app).post("/users").send({
      username: "test-integration-password-reset-find-by-token",
      email: "test-integration-password-reset-find-by-token@example.com",
      password: "test123",
    });

    await request(app).post("/users/reset-password").send({
      email: "test-integration-password-reset-find-by-token@example.com",
    });

    const response = await request(app).get(`/users/find-by-id/1`);

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-password-reset-find-by-token@example.com",
      },
    });
  });
});
