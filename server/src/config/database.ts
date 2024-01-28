/**
 * this file is used to set up the database connection with Prisma
 */
// ---------------------- IMPORTS ---------------------- //
import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';
// ---------------------- MAIN ---------------------- //
export const db = new PrismaClient({
	log: ['error', 'warn'],
});

export const database = async () => {
	try {
		await db.$connect();
		logger.successDbLogger();
	} catch (err) {
		logger.errorDbLogger();
	} finally {
		await db.$disconnect();
	}
};
