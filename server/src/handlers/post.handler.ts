import { Request, Response } from 'express';
import { catchAsync, response, statusCodes } from '../utils';
import { Post } from '@prisma/client';
import { db } from '../config';
import fs from 'node:fs';

export const makePost = catchAsync(async (req: Request, res: Response) => {
	const { file } = req;
	const {
		title,
		description,
		jobType,
		experienceLevel,
		establishmentName,
		domain,
		authorId,
	}: Post = req.body;
	const newPost = await db.post.create({
		data: {
			title,
			description,
			jobType,
			experienceLevel,
			establishmentName,
			domain,
			authorId,
		},
	});

	const filename = `${newPost.id}.pdf`;
	const destinationDirectory = 'resumes/';

	if (!fs.existsSync(destinationDirectory)) {
		fs.mkdirSync(destinationDirectory);
	}

	if (file) {
		fs.writeFileSync(destinationDirectory + filename, file.buffer);
	}

	response(res, statusCodes.CREATED, 'post created succesfully', newPost);
});
