// -------------------- IMPORTS -------------------- //
import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { appSession, passport } from './auth';
import cors from 'cors';
import { corsOption } from './config';
// -------------------- CONFIG -------------------- //
const app: Application = express();
// -------------------- MIDDLEWARES -------------------- //
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet());
// -------------------- GOOGLE AUTH -------------------- //
app.use(appSession);
app.use(passport.initialize());
app.use(passport.session());

app.get(
	'/login',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/failure',
	})
);
app.get('/failure', (req, res) => {
	res.status(401).json({ message: 'failed to authenticate' });
});

app.get('/logout', (req, res) => {
	req.logout(() => {});
	res.status(200).json({ message: 'logged out' });
});
// -------------------- EXPORTS -------------------- //
export default app;
