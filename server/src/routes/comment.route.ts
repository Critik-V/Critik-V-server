import { Router } from 'express';
import { commentHandler } from '../handlers';
import { isAuthenticated } from '../auth';

const router = Router();

router.use(isAuthenticated);

router
	.route('/')
	.get(commentHandler.getPostComments)
	.post(commentHandler.createComment);


router
	.route('/:id')
	.patch(commentHandler.updateComment)
	.delete(commentHandler.deleteComment);

router.route('/like/:id').patch(commentHandler.uplikeComment);
router.route('/dislike/:id').patch(commentHandler.downlikeComment);

export default router;
