import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Auth user controller", () => {
  it("should be able to auth user", async () => {
    await request(app).post("/users").send({
      username: "test-integration-auth-user",
      email: "test-integration-auth-user@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users/auth").send({
      username: "test-integration-auth-user",
      password: "test123",
    });

    expect(response.status).toBe(201);
  });

  it("should be able to auth user if username is incorrect", async () => {
    await request(app).post("/users").send({
      username: "test-integration-auth-user",
      email: "test-integration-auth-user@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users/auth").send({
      username: "test-integration-auth-use",
      password: "test123",
    });

    expect(response.status).toBe(400);
  });

  it("should be able to auth user if password is incorrect", async () => {
    await request(app).post("/users").send({
      username: "test-integration-auth-user",
      email: "test-integration-auth-user@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users/auth").send({
      username: "test-integration-auth-user",
      password: "test12",
    });

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-auth-user@example.com",
      },
    });
  });
});
