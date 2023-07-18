import { expect, test } from "vitest";
import { PasswordReset } from "./passwordReset";
import { generateRandomToken } from "../utils/math/generateRandomToken";

test("create a password reset token", () => {
  const passwordReset = new PasswordReset({
    id: "1",
    token: generateRandomToken(15),
    expiresDate: new Date(Date.now() + 86400 * 1000),
    userId: "1",
  });

  expect(passwordReset).instanceOf(PasswordReset);
});
