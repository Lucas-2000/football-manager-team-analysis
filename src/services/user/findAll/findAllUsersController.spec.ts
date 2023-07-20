import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";

describe("Find All Users Controller", () => {
  it("should be able to find all users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Array);
  });
});
