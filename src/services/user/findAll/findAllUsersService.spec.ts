import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { FindAllUsersService } from "./findAllUsersService";
import { CreateUserService } from "../create/createUserService";

describe("Find All Users", () => {
  it("should be able to find all users", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const findAllUsersService = new FindAllUsersService(usersRepository);
    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
      avatar: null,
    });

    await expect(findAllUsersService.execute()).resolves.toEqual([user]);
  });
});
