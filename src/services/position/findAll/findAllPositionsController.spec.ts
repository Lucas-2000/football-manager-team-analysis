import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";

describe("Find All Positions Controller", () => {
  it("should be able to find all positions", async () => {
    const response = await request(app).get("/positions");

    expect(response.status).toBe(201);
  });
});
