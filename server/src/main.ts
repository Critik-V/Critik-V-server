/**
 * this file is the entry point of the application
 */

// --------------------- IMPORTS --------------------- //
import { resolve } from 'node:path';
import { config } from 'dotenv';
import app from './app';
import server from './config/server';
import database from './config/database';
// -------------------- CONFIG -------------------- //
config({
	path: resolve(__dirname, '../.env'),
});
// -------------------- DATABASE -------------------- //
database();
// -------------------- SERVER -------------------- //
server(app);
