import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Create user controller", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      username: "test-integration",
      email: "test-integration@example.com",
      password: "test123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("username");
  });

  it("should not be able to create a new user if username already exists", async () => {
    await request(app).post("/users").send({
      username: "test-integration",
      email: "test-integration@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users").send({
      username: "test-integration",
      email: "test-integration1@example.com",
      password: "test123",
    });

    expect(response.status).toBe(400);
  });

  it("should not be able to create a new user if email already exists", async () => {
    await request(app).post("/users").send({
      username: "test-integration",
      email: "test-integration@example.com",
      password: "test123",
    });

    const response = await request(app).post("/users").send({
      username: "test-integration1",
      email: "test-integration@example.com",
      password: "test123",
    });

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration@example.com",
      },
    });
  });
});
