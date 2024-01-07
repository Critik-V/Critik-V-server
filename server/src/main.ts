import { config } from "dotenv";
import path from "node:path";
import app from "./app";
import server from "./config/server";

// -------------------- CONFIG -------------------- //
config({
  path: path.resolve(__dirname, "../.env"),
});

// -------------------- DATABASE -------------------- //

// -------------------- SERVER -------------------- //
server(app);
