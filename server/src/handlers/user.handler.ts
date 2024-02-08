import { Request, Response } from 'express';
import { catchAsync, response, statusCodes } from '../utils';
import { db } from '../config';
import { User } from '@prisma/client';

export const createUser = catchAsync(async (req: Request, res: Response) => {
	const { oauthId, fullname }: User = req.body;
	const newUser = await db.user.create({
		data: {
			oauthId,
			fullname,
		},
	});
	response(res, statusCodes.CREATED, 'user created succesfully', newUser);
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
	const {
		description,
		linkedinLink,
		githubLink,
		id,
		oauthId,
		language,
		theme,
	}: User = req.body;
	const updatedUser = await db.user.update({
		where: {
			id,
			oauthId,
		},
		data: {
			description,
			linkedinLink,
			githubLink,
			language,
			theme,
		},
	});
	response(res, statusCodes.OK, 'user updated succesfully', updatedUser);
});
