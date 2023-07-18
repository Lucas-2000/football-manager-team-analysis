import fs from "fs/promises";
import { UploadUserAvatarService } from "./../uploadAvatar/uploadUserAvatarService";
import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../create/createUserService";
import { DeleteUserService } from "./deleteUserService";
import path from "path";

describe("Delete User Service", () => {
  it("should be able to delete a user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const deleteUserService = new DeleteUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      deleteUserService.execute({ id: "1" })
    ).resolves.toBeInstanceOf(Array);
  });

  it("should be able to delete a user and avatar from uploas folder if user have avatar", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const deleteUserService = new DeleteUserService(usersRepository);
    const uploadUserAvatarService = new UploadUserAvatarService(
      usersRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
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

    await uploadUserAvatarService.execute({
      id: "1",
      avatar: "teste",
    });

    await expect(
      deleteUserService.execute({ id: "1" })
    ).resolves.toBeInstanceOf(Array);
  });

  it("should not be able to delete a user if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const deleteUserService = new DeleteUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(deleteUserService.execute({ id: "2" })).rejects.toBeInstanceOf(
      Error
    );
  });
});
