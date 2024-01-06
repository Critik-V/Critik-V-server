/**
 * this file is used to set up the database connection with Prisma
 */
// ---------------------- IMPORTS ---------------------- //
// import { PrismaClient } from "@prisma/client";
import logger from "@utils/logger";
// ---------------------- MAIN ---------------------- //
const database = async () => {
//   const prisma = new PrismaClient();
  try {
    // await prisma.$connect();
    logger.successDbLogger();
  } catch (err) {
    logger.errorDbLogger();
  } finally {
    // await prisma.$disconnect();
  }
};
// ---------------------- EXPORTS ---------------------- //
module.exports = database;
