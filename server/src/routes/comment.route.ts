import { Router } from 'express';
import { commentHandler } from '../handlers';

const router = Router();

router
	.get('/', commentHandler.getPostComments)
	.post('/', commentHandler.createComment)
	.delete('/', commentHandler.deleteComment);
router.post('/:id', commentHandler.updateComment);
router.post('/like/:id', commentHandler.uplikeComment);
router.post('/dislike/:id', commentHandler.downlikeComment);

export default router;
