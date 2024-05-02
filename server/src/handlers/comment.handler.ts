import { Request, Response } from 'express';
import { catchAsync, response, statusCodes } from '../utils';
import { Comment } from '@prisma/client';
import { db } from '../config';

export const createComment = catchAsync(async (req: Request, res: Response) => {
	const { postId, content }: Comment = req.body;
	const { id: authorId } = req.user as Comment;

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
	const { content }: Comment = req.body;
	const { id: authorId } = req.user as Comment;

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
	const { id }: { id: string } = req.params as { id: string };
	const { id: authorId } = req.user as Comment;

	await db.comment.delete({
		where: {
			id,
			authorId,
		},
	});
	response(res, statusCodes.OK, 'comment deleted succesfully', undefined);
});

export const getPostComments = catchAsync(
	async (req: Request, res: Response) => {
		const { postId }: { postId: string } = req.body as {
			postId: string;
		};
		const comments = await db.comment.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			where: {
				postId,
			},
			include: {
				upLikes: true,
				downLikes: true,
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
	const { id: userId } = req.user as Comment;

	await db.comment.update({
		where: {
			id,
		},
		data:
			action === likeAction.TRUE
				? {
						upLikes: {
							connect: {
								id: userId,
							},
						},
						totalUpLikes: { increment: 1 },
					}
				: {
						upLikes: {
							disconnect: {
								id: userId,
							},
						},
						totalUpLikes: { decrement: 1 },
					},
	});
	response(res, statusCodes.OK, 'comment liked succesfully', undefined);
});

export const downlikeComment = catchAsync(
	async (req: Request, res: Response) => {
		enum likeAction {
			TRUE = 'true',
			FALSE = 'false',
		}
		const { id }: { id: string } = req.params as { id: string };
		const { action } = req.query as { action: likeAction };
		const { id: userId } = req.user as Comment;

		await db.comment.update({
			where: {
				id,
			},
			data:
				action === likeAction.TRUE
					? {
							downLikes: {
								connect: {
									id: userId,
								},
							},
							totalDownLikes: { increment: 1 },
						}
					: {
							downLikes: {
								disconnect: {
									id: userId,
								},
							},
							totalDownLikes: { decrement: 1 },
						},
		});
		response(res, statusCodes.OK, 'comment disliked succesfully', undefined);
	}
);
