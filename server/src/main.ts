// --------------------- IMPORTS --------------------- //
import { NextFunction, Request, Response } from 'express';
import app from './app';
import { database, db, server } from './config';
import { ErrorHandlers, Panic } from './errors';
import { commentRouter, notifRouter, postRouter, userRouter } from './routes';
import { apiRoutePrefix, statusCodes } from './utils';
import expressListRoutes from 'express-list-routes';
// -------------------- DATABASE -------------------- //
database();

// -------------------- ROUTES -------------------- //
app.use(apiRoutePrefix('users'), userRouter);
app.use(apiRoutePrefix('posts'), postRouter);
app.use(apiRoutePrefix('comments'), commentRouter);
app.use(apiRoutePrefix('notifications'), notifRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) =>
	next(new Panic(`Path ${req.originalUrl} not found`, statusCodes.NOT_FOUND))
);
// -------------------- ERRORS -------------------- //
app.use(ErrorHandlers);
// -------------------- SERVER -------------------- //
if (process.env.NODE_ENV === 'development') {
	expressListRoutes(userRouter, {
		prefix: apiRoutePrefix('users'),
		spacer: 15,
	});
	expressListRoutes(postRouter, {
		prefix: apiRoutePrefix('posts'),
		spacer: 15,
	});
	expressListRoutes(commentRouter, {
		prefix: apiRoutePrefix('comments'),
		spacer: 15,
	});
	expressListRoutes(notifRouter, {
		prefix: apiRoutePrefix('notifications'),
		spacer: 15,
	});
}
server(app);
