import { NextFunction, Request, Response } from 'express';
import {
	catchAsync,
	githubPattern,
	linkedinPattern,
	otherPattern,
	response,
	statusCodes,
} from '../utils';
import { db } from '../config';
import { User } from '@prisma/client';
import { ErrorsMessages, Panic } from '../errors';

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

export const updateUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const {
			description,
			linkedinLink,
			githubLink,
			otherLink,
			language,
			theme,
		}: User = req.body;

		const { id } = req.user as User;

		linkedinLink && !linkedinPattern.test(linkedinLink)
			? next(new Panic(ErrorsMessages.INVALID_LINKEDIN_LINK, statusCodes.BAD_REQUEST))
			: null;
		githubLink && !githubPattern.test(githubLink)
			? next(new Panic(ErrorsMessages.INVALID_GITHUB_LINK, statusCodes.BAD_REQUEST))
			: null;
		otherLink && !otherPattern.test(otherLink)
			? next(new Panic(ErrorsMessages.INVALID_OTHER_LINK, statusCodes.BAD_REQUEST))
			: null;

		const updatedUser = await db.user.update({
			where: {
				id,
			},
			data: {
				description,
				linkedinLink,
				githubLink,
				language,
				theme,
				otherLink,
			},
		});
		response(res, statusCodes.OK, 'user updated succesfully', updatedUser);
	}
);
