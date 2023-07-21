import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Generate password reset controller", () => {
  it("should be able to generate a password reset", async () => {
    await request(app).post("/users").send({
      username: "test-integration-generate-password",
      email: "test-integration-generate-password@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users/reset-password").send({
      email: "test-integration-generate-password@example.com",
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to generate a password reset if user not found", async () => {
    await request(app).post("/users").send({
      username: "test-integration-generate-password",
      email: "test-integration-generate-password@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users/reset-password").send({
      email: "test-integration-generate-password1@example.com",
    });

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-generate-password@example.com",
      },
    });
  });
});
