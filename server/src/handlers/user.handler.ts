import { Request, Response } from 'express';
import { catchAsync, response, statusCodes } from '../utils';
import { db } from '../config';
import { User } from '@prisma/client';

export const createUser = catchAsync(async (req: Request, res: Response) => {
	const { oauthId, firstName, lastName }: User = req.body;
	const newUser = await db.user.create({
		data: {
			oauthId,
			firstName,
			lastName,
		},
	});
	response(res, statusCodes.CREATED, 'user created succesfully', newUser);
});
