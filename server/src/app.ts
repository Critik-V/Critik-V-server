// -------------------- IMPORTS -------------------- //
import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
// -------------------- CONFIG -------------------- //
const app: Application = express();

const corsOrginList: string[] = [`${process.env.CLIENT_URL}`];
const corsAllowedHeadersList: string[] = ['Content-Type', 'Authorization'];
const corsOptions: CorsOptions = {
	origin: corsOrginList,
	optionsSuccessStatus: 200,
	allowedHeaders: corsAllowedHeadersList,
};
// -------------------- MIDDLEWARES -------------------- //
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
// -------------------- EXPORTS -------------------- //
export default app;
