import statusCodes from "../statusCodes";
import { test, describe, expect } from "vitest";

describe("statusCodes", () => {
  test("should return the correct status code", () => {
    expect(statusCodes.OK).toBe(200);
    expect(statusCodes.CREATED).toBe(201);
    expect(statusCodes.BAD_REQUEST).toBe(400);
    expect(statusCodes.UNAUTHORIZED).toBe(401);
    expect(statusCodes.NOT_FOUND).toBe(404);
    expect(statusCodes.INTERNAL_SERVER_ERROR).toBe(500);
  });
});
