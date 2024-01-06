import { expect, describe, test } from "vitest";
import logger from "../logger";
import chalk from "chalk";

const table: Function = (
  name: string,
  message: string,
  status: string
): string => `+-------------------+--------------------+--------------------+
| ${name}            | ${message}        | ${status}          
+-------------------+--------------------+--------------------+`;

describe("logger", () => {
  test("DB connected", () => {
    expect(typeof logger.successDbLogger).toBe("function");
    expect(logger.successDbLogger()).toBe(
      console.log(chalk.green(table("Database", "Database is connected", "✅")))
    );
  });
  test("DB not connected", () => {
    expect(typeof logger.errorDbLogger).toBe("function");
    expect(logger.errorDbLogger()).toBe(
      console.log(
        chalk.red(table("Database", "Database is not connected", "❌"))
      )
    );
  });
  test("Server running", () => {
    expect(typeof logger.successServerLogger).toBe("function");
    expect(logger.successServerLogger()).toBe(
      console.log(chalk.green(table("Server", "Server is running", "✅")))
    );
  });
  test("Server not running", () => {
    expect(typeof logger.errorServerLogger).toBe("function");
    expect(logger.errorServerLogger()).toBe(
      console.log(chalk.red(table("Server", "Server is not running", "❌")))
    );
  });
});
