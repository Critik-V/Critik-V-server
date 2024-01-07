// -------------------- IMPORTS -------------------- //
import { Application } from "express";
import http from "node:http";
import logger from "../utils/logger";
// -------------------- MAIN -------------------- //
const server = (app: Application) => {
  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST || "127.0.0.1";

  const httpServer = http.createServer(app);
  httpServer.listen({ port: PORT, hostname: HOST }, async () => {
    try {
      logger.successServerLogger();
    } catch (error) {
      logger.errorServerLogger();
      httpServer.close();
      process.exit(1);
    }
  });
};
// -------------------- EXPORTS -------------------- //
export default server;
