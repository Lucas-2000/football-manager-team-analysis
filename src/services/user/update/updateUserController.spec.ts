import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Update user controller", () => {
  it("should be able to update a user", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-update-user",
      email: "test-integration-update-user@example.com",
      password: "test123",
    });

    const response = await request(app).put(`/users/${user.body.id}`).send({
      username: "test-integration-update-user1",
      email: "test-integration-update-user@example.com",
      password: "test123",
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to update a user if user not found", async () => {
    await request(app).post("/users").send({
      username: "test-integration-update-user",
      email: "test-integration-update-user@example.com",
      password: "test123",
    });

    const response = await request(app).put(`/users/1`).send({
      username: "test-integration-update-user1",
      email: "test-integration-update-user@example.com",
      password: "test123",
    });

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-update-user@example.com",
      },
    });
  });
});
