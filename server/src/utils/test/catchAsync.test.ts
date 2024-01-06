import {describe, test, expect } from "vitest";
import catchAsync from "../catchAsync";

describe("catchAsync", () => {
    test("should return a function", () => {
        expect(typeof catchAsync(async () => {})).toBe("function");
    });
});
