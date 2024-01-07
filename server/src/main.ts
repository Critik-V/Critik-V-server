/**
 * this file is the entry point of the application
 */

// --------------------- IMPORTS --------------------- //
import path from "node:path";
import { config } from "dotenv";
import app from "./app";
import server from "./config/server";

// -------------------- CONFIG -------------------- //
config({
  path: path.resolve(__dirname, "../.env"),
});

// -------------------- DATABASE -------------------- //

// -------------------- SERVER -------------------- //
server(app);
