import fs from "fs/promises";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import path from "path";
import { DeleteUserService } from "../delete/deleteUserService";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";

describe("Upload user avatar controller", () => {
  let user: request.Response;

  beforeEach(async () => {
    user = await request(app).post("/users").send({
      username: "test-integration-user-avatar",
      email: "test-integration-user-avatar@example.com",
      password: "test123",
    });
  });

  it("should be able to update user avatar", async () => {
    const req = await request(app).post("/users/auth").send({
      username: "test-integration-user-avatar",
      password: "test123",
    });

    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads
    const tempFilePath = path.join(uploadsFolder, "teste");

    // Cria um arquivo temporário
    await fs.writeFile(tempFilePath, "conteúdo do arquivo");

    const response = await request(app)
      .post(`/users/${user.body.id}/avatar`)
      .set("Authorization", `Bearer ${req.body.token}`)
      .attach("file", tempFilePath);

    expect(response.status).toBe(201);
  });

  afterEach(async () => {
    const usersRepository = new PrismaUsersRepository();
    const deleteUserService = new DeleteUserService(usersRepository);

    await deleteUserService.execute({
      id: user.body.id,
    });
  });
});
