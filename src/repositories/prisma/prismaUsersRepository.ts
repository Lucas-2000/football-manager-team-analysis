import { User } from "../../entities/user";
import { prisma } from "../../utils/config/prisma/prismaClient";
import { UsersRepository } from "../usersRepository";
import { v4 as uuid } from "uuid";

export class PrismaUsersRepository implements UsersRepository {
  async create({ username, email, password, avatar }: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: uuid(),
        username,
        email,
        password,
        avatar,
      },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(
      (user) =>
        new User({
          id: user.id,
          username: user.username,
          email: user.id,
          password: user.password,
          avatar: user.avatar,
        })
    );
  }

  async verifyExistingEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  async verifyExistingUsername(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return !!user;
  }

  async findById(userId: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return;

    return new User({
      id: user.id,
      username: user.username,
      email: user.id,
      password: user.password,
      avatar: user.avatar,
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { id: username },
    });

    if (!user) return;

    return new User({
      id: user.id,
      username: user.username,
      email: user.id,
      password: user.password,
      avatar: user.avatar,
    });
  }

  async findIndex(userId: string): Promise<number> {
    const users = await prisma.user.findMany();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex < 0) return -1;

    return userIndex;
  }

  async update({ id, username, email, password, avatar }: User): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        password,
        avatar,
      },
    });
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({ where: { id: userId } });
  }
}
