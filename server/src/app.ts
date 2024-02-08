// -------------------- IMPORTS -------------------- //
import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { appSession, passport } from './auth';
import cors, { CorsOptions } from 'cors';
// -------------------- CONFIG -------------------- //
const app: Application = express();
// -------------------- CORS -------------------- //
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
app.use(morgan(process.env.ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet());
// -------------------- GOOGLE AUTH -------------------- //
app.use(appSession);
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('google'));
app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/failure',
	})
);
app.get('/logout', (req, res) => {
	req.logout(() => {});
	res.status(200).json({ message: 'logged out' });
});
// -------------------- EXPORTS -------------------- //
export default app;
