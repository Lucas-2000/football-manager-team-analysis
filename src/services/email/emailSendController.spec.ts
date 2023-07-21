import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "../../utils/config/prisma/prismaClient";
import { app } from "../../app";

describe("Email Send controller", () => {
  // it("should be able to send a email", async () => {
  //   await request(app).post("/users").send({
  //     username: "test-integration-send-email",
  //     email: "test-integration-send-email@example.com",
  //     password: "test123",
  //   });

  //   const resetPassword = await request(app)
  //     .post("/users/reset-password")
  //     .send({
  //       email: "test-integration-send-email@example.com",
  //     });

  //   const response = await request(app).post("/users/email").send({
  //     email: "test-integration-send-email@example.com",
  //     token: resetPassword.body.token,
  //     subject: "Reset de senha",
  //   });

  //   expect(response.status).toBe(201);
  // });

  it("should not be able to send a email if user not found", async () => {
    await request(app).post("/users").send({
      username: "test-integration-send-email",
      email: "test-integration-send-email@example.com",
      password: "test123",
    });

    const resetPassword = await request(app)
      .post("/users/reset-password")
      .send({
        email: "test-integration-send-email@example.com",
      });

    const response = await request(app).post("/users/email").send({
      email: "test-integration-send-email1@example.com",
      token: resetPassword.body.token,
      subject: "Reset de senha",
    });

    expect(response.status).toBe(400);
  });

  it("should not be able to send a email if token not found", async () => {
    await request(app).post("/users").send({
      username: "test-integration-send-email",
      email: "test-integration-send-email@example.com",
      password: "test123",
    });

    await request(app).post("/users/reset-password").send({
      email: "test-integration-send-email@example.com",
    });

    const response = await request(app).post("/users/email").send({
      email: "test-integration-send-email@example.com",
      token: "resetPassword.body.token",
      subject: "Reset de senha",
    });

    expect(response.status).toBe(400);
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: "test-integration-send-email@example.com",
      },
    });
  });
});
