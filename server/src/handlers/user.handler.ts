import { NextFunction, Request, Response } from 'express';
import { catchAsync, response, statusCodes } from '../utils';
import { db } from '../config';
import { User } from '@prisma/client';
import { Panic } from '../errors';

const linkedinPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
const githubPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/?$/;
const otherPattern = /^https?:\/\/[a-zA-Z0-9_-]+\/?$/;

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
			id,
			oauthId,
			language,
			theme,
		}: User = req.body;

		linkedinLink && !linkedinPattern.test(linkedinLink)
			? next(new Panic('invalid linkedin link', statusCodes.BAD_REQUEST))
			: null;
		githubLink && !githubPattern.test(githubLink)
			? next(new Panic('invalid github link', statusCodes.BAD_REQUEST))
			: null;
		otherLink && !otherPattern.test(otherLink)
			? next(new Panic('invalid other link', statusCodes.BAD_REQUEST))
			: null;

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
				otherLink,
			},
		});
		response(res, statusCodes.OK, 'user updated succesfully', updatedUser);
	}
);
