import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";

describe("Find All Teams Controller", () => {
  it("should be able to find all teams", async () => {
    const response = await request(app).get("/teams");

    expect(response.status).toBe(201);
  });
});
