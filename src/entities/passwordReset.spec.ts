import { expect, test } from "vitest";
import { PasswordReset } from "./passwordReset";

test("create a password reset token", () => {
  const passwordReset = new PasswordReset({
    userId: "1",
  });

  expect(passwordReset).instanceOf(PasswordReset);
});
