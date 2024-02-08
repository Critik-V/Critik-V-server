import { NextFunction, Request, Response } from 'express';
import { Panic } from '../errors';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuthenticated()) {
		return next(new Panic('User not authenticated', 401));
	}
	return next();
};

export default isAuthenticated;
