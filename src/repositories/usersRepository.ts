import { User } from "../entities/user";

export interface UsersRepository {
  create(user: User): Promise<void>;
  verifyExistingUsername(username: string): Promise<boolean>;
  verifyExistingEmail(email: string): Promise<boolean>;
  findAll(): Promise<User[]>;
  findById(userId: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findIndex(userId: string): Promise<number>;
  update(user: User): Promise<void>;
  delete(userId: string): Promise<void>;
}
