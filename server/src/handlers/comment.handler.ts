import { Request, Response } from 'express';
import { catchAsync, response, statusCodes } from '../utils';
import { Comment } from '@prisma/client';
import { db } from '../config';

export const createComment = catchAsync(async (req: Request, res: Response) => {
	const { postId, authorId, content }: Comment = req.body;
	const newComment = await db.comment.create({
		data: {
			postId,
			authorId,
			content,
		},
	});
	response(res, statusCodes.CREATED, 'comment created succesfully', newComment);
});

export const updateComment = catchAsync(async (req: Request, res: Response) => {
	const { id }: { id: string } = req.params as { id: string };
	const { authorId, content }: Comment = req.body;
	const updatedComment = await db.comment.update({
		where: {
			id,
			authorId,
		},
		data: {
			content,
		},
	});
	response(res, statusCodes.OK, 'comment updated succesfully', updatedComment);
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
	const { authorId, id }: Comment = req.body;
	await db.comment.delete({
		where: {
			id,
			authorId,
		},
	});
	res.status(statusCodes.OK).json({ message: 'comment deleted succesfully' });
});

export const getPostComments = catchAsync(
	async (req: Request, res: Response) => {
		const { postId }: { postId: string } = req.params as { postId: string };
		const comments = await db.comment.findMany({
			where: {
				postId,
			},
			include: {
				upLikes: true,
				downLikes: true,
				author: true,
			},
		});
		response(res, statusCodes.OK, 'comments fetched succesfully', comments);
	}
);

export const uplikeComment = catchAsync(async (req: Request, res: Response) => {
	enum likeAction {
		TRUE = 'true',
		FALSE = 'false',
	}
	const { id }: { id: string } = req.params as { id: string };
	const { action } = req.query as { action: likeAction };
	const { authorId }: Comment = req.body;
	await db.comment.update({
		where: {
			id,
		},
		data:
			action === likeAction.TRUE
				? {
						upLikes: {
							connect: {
								id: authorId,
							},
						},
						totalUpLikes: { increment: 1 },
					}
				: {
						upLikes: {
							disconnect: {
								id: authorId,
							},
						},
						totalUpLikes: { decrement: 1 },
					},
	});
	res.status(statusCodes.OK).json({ message: 'comment liked succesfully' });
});

export const downlikeComment = catchAsync(
	async (req: Request, res: Response) => {
		enum likeAction {
			TRUE = 'true',
			FALSE = 'false',
		}
		const { id }: { id: string } = req.params as { id: string };
		const { action } = req.query as { action: likeAction };
		const { authorId }: Comment = req.body;
		await db.comment.update({
			where: {
				id,
			},
			data:
				action === likeAction.TRUE
					? {
							downLikes: {
								connect: {
									id: authorId,
								},
							},
							totalDownLikes: { increment: 1 },
						}
					: {
							downLikes: {
								disconnect: {
									id: authorId,
								},
							},
							totalDownLikes: { decrement: 1 },
						},
		});
		res
			.status(statusCodes.OK)
			.json({ message: 'comment disliked succesfully' });
	}
);
