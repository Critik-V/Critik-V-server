/**
 * this file is for the express application
 */

// -------------------- IMPORTS -------------------- //
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import Panic from './errors/Panic';
import ErrorHandlers from './errors/ErrorHandlers';
import statusCodes from './utils/statusCodes';
import helmet from 'helmet';
// -------------------- CONFIG -------------------- //
const app: Application = express();
// -------------------- MIDDLEWARES -------------------- //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
// -------------------- ROUTES -------------------- //
app.all('*', (req: Request, res: Response, next: NextFunction) =>
	next(new Panic('Not Found', statusCodes.NOT_FOUND))
);
// -------------------- ERRORS -------------------- //
app.use(ErrorHandlers);
// -------------------- EXPORTS -------------------- //
export default app;
