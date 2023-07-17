import { User } from "../../entities/user";
import { UsersRepository } from "../usersRepository";

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async verifyExisting(username: string, email: string): Promise<boolean> {
    const usernameExists = this.users.find((u) => u.username === username);
    const emailExists = this.users.find((u) => u.email === email);

    if (usernameExists || emailExists) return true;

    return false;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(userId: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.id === userId);

    return user;
  }

  async findIndex(userId: string): Promise<number> {
    const userIndex = this.users.findIndex((obj) => obj.id === userId);

    if (userIndex < 0) return -1;

    return userIndex;
  }

  async update(user: User): Promise<void> {
    const userToUpdate = this.users.find((u) => u.id === user.id);

    if (userToUpdate !== undefined) {
      Object.assign(userToUpdate, user);
    }
  }

  async delete(userId: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
  }
}
