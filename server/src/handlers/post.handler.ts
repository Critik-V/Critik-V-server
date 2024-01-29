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

export const modifyPost = catchAsync(async (req: Request, res: Response) => {
	const { id }: { id: string } = req.params as { id: string };
	const {
		authorId,
		title,
		description,
		jobType,
		experienceLevel,
		establishmentName,
		domain,
	}: Post = req.body;
	const post = await db.post.update({
		where: {
			id: id,
			authorId: authorId,
		},
		data: {
			title,
			description,
			jobType,
			experienceLevel,
			establishmentName,
			domain,
		},
	});

	response(res, statusCodes.OK, 'post modified succesfully', post);
});

export const deletePost = catchAsync(async (req: Request, res: Response) => {
	const { id }: { id: string } = req.params as {
		id: string;
	};
	const { authorId }: Post = req.body;
	await db.post.delete({
		where: {
			id: id,
			authorId: authorId,
		},
	});
	res.status(statusCodes.OK).json({
		status: 'success',
		message: 'post deleted succesfully',
	});
});

export const archivePost = catchAsync(async (req: Request, res: Response) => {
	const { id }: { id: string } = req.params as { id: string };
	const { authorId }: Post = req.body;
	await db.post.update({
		where: {
			id: id,
			authorId: authorId,
		},
		data: {
			archived: true,
		},
	});
	res.status(statusCodes.OK).json({
		status: 'success',
		message: 'post archived succesfully',
	});
});

export const getMyPosts = catchAsync(async (req: Request, res: Response) => {
	const { authorId }: Post = req.body;
	const posts = await db.post.findMany({
		where: {
			authorId: authorId,
			archived: false,
		},
		include: {
			comments: true,
			favByUsers: true,
			likes: true,
		},
	});
	response(res, statusCodes.OK, 'posts fetched succesfully', posts);
});

export const getArchivedPosts = catchAsync(
	async (req: Request, res: Response) => {
		const { authorId }: Post = req.body;
		const posts = await db.post.findMany({
			where: {
				authorId: authorId,
				archived: true,
			},
			include: {
				comments: true,
				favByUsers: true,
				likes: true,
			},
		});
		response(res, statusCodes.OK, 'posts fetched succesfully', posts);
	}
);

export const getOneArchivedPost = catchAsync(
	async (req: Request, res: Response) => {
		const { id }: { id: string } = req.params as { id: string };
		const { authorId }: Post = req.body;
		const post = await db.post.findFirst({
			where: {
				id: id,
				authorId: authorId,
				archived: true,
			},
			include: {
				comments: true,
				favByUsers: true,
				likes: true,
			},
		});
		res.status(statusCodes.OK).json({
			status: 'success',
			message: 'post fetched succesfully',
			data: post,
		});
	}
);
