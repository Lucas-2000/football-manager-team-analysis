import { expect, test } from "vitest";
import { User } from "./user";

test("create a user", () => {
  const user = new User({
    id: "1",
    username: "test",
    email: "test@example.com",
    password: "test123",
    avatar: null,
  });

  expect(user).instanceOf(User);
  expect(user).toHaveProperty("id");
});
