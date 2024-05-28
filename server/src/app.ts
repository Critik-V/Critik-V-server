// -------------------- IMPORTS -------------------- //
import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { appSession, passport } from './auth';
import cors from 'cors';
import { corsOption } from './config';
import { apiRoutePrefix, statusCodes } from './utils';
import { User } from '@prisma/client';
import path from 'node:path';
// -------------------- CONFIG -------------------- //
const app: Application = express();
// -------------------- MIDDLEWARES -------------------- //
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet());
// -------------------- FILES -------------------- //
app.use(
	apiRoutePrefix('resumes'),
	express.static(path.join(__dirname, '../resumes/images'))
);
// -------------------- GOOGLE AUTH -------------------- //
app.use(appSession);
app.use(passport.initialize());
app.use(passport.session());

app.get(
	apiRoutePrefix('login'),
	passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.CLIENT_ORIGIN + '/',
		failureRedirect: process.env.CLIENT_ORIGIN + '/login',
	})
);

app.get(apiRoutePrefix('is-authenticated'), (req, res) => {
	if (req.isAuthenticated()) {
		return res.status(statusCodes.OK).json({ isAuth: true });
	}
	return res.status(statusCodes.UNAUTHORIZED).json({ isAuth: false });
});

app.get(apiRoutePrefix('logout'), (req, res) => {
	req.logout(() => {});
	res.clearCookie('connect.sid');
	res.status(200).json({ message: 'logged out' });
});

// route to get current user info
app.get(apiRoutePrefix('user'), (req, res) => {
	if (req.isAuthenticated()) {
		console.log('User authenticated');
		const user = req.user as User;
		user.id = '';
		user.oauthId = '';
		return res.status(200).json(req.user);
	}
	console.log('User not authenticated');
	return res.status(401).json({ message: 'User not authenticated' });
});

// -------------------- EXPORTS -------------------- //
export default app;
