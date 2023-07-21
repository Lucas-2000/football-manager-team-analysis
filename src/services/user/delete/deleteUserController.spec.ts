import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../utils/config/prisma/prismaClient";

describe("Delete user controller", () => {
  it("should be able to delete a user", async () => {
    const user = await request(app).post("/users").send({
      username: "test-integration-delete-user1",
      email: "test-integration-delete-user1@example.com",
      password: "test123",
    });

    const response = await request(app).delete(`/users/${user.body.id}`);

    expect(response.status).toBe(201);
  });

  it("should not be able to delete a user if user not found", async () => {
    await request(app).post("/users").send({
      username: "test-integration-delete-user",
      email: "test-integration-delete-user@example.com",
      password: "test123",
    });

    const response = await request(app).delete(`/users/1`);

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-delete-user@example.com",
      },
    });
  });
});
