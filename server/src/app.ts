// -------------------- IMPORTS -------------------- //
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import Panic from "./errors/Panic";
import ErrorHandlers from "./errors/ErrorHandlers";
import statusCodes from "./utils/statusCodes";
// -------------------- CONFIG -------------------- //
const app: Application = express();
// -------------------- MIDDLEWARES -------------------- //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// -------------------- ROUTES -------------------- //
app.all("*", (req: Request, res: Response, next: NextFunction) =>
  next(new Panic("Not Found", statusCodes.NOT_FOUND))
);
// -------------------- ERRORS -------------------- //
app.use(ErrorHandlers);
// -------------------- EXPORTS -------------------- //
export default app;
