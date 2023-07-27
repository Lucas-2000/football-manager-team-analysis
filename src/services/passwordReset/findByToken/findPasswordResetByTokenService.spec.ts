import { describe, expect, it } from "vitest";
import { InMemoryPasswordResetRepository } from "../../../repositories/inMemory/inMemoryPasswordResetRepository";
import { FindPasswordResetByTokenService } from "./findPasswordResetByTokenService";
import { GeneratePasswordResetService } from "../generate/generatePasswordResetService";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";

describe("Find By token service", () => {
  it("should be able to find a password reset by token", async () => {
    const passwordResetRepository = new InMemoryPasswordResetRepository();
    const usersRepository = new InMemoryUsersRepository();
    const findByTokenService = new FindPasswordResetByTokenService(
      passwordResetRepository
    );
    const generatePasswordResetService = new GeneratePasswordResetService(
      passwordResetRepository,
      usersRepository
    );

    const token = await generatePasswordResetService.execute({
      email: "test@example.com",
    });

    expect(
      findByTokenService.execute({ token: token.token as string })
    ).resolves.toHaveProperty("token");
  });

  it("should not be able to find a password reset by token if token not found", async () => {
    const passwordResetRepository = new InMemoryPasswordResetRepository();
    const usersRepository = new InMemoryUsersRepository();
    const findByTokenService = new FindPasswordResetByTokenService(
      passwordResetRepository
    );
    const generatePasswordResetService = new GeneratePasswordResetService(
      passwordResetRepository,
      usersRepository
    );

    await generatePasswordResetService.execute({
      email: "test@example.com",
    });

    expect(
      findByTokenService.execute({ token: "token.token as string" })
    ).rejects.toBeInstanceOf(Error);
  });
});
