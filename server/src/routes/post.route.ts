import { Router } from 'express';
import multer from 'multer';
import { postHandler } from '../handlers';
// import { isAuthenticated } from '../auth';

const upload = multer({
	storage: multer.memoryStorage(),
});

const router = Router();

// router.use(isAuthenticated);

router
	.route('/')
	.get(postHandler.getNewestPosts)
	.post(upload.single('resume'), postHandler.makePost);

router.route('/mine').get(postHandler.getMyPosts);
router.route('/archived').get(postHandler.getArchivedPosts);
router.route('/fav').post(postHandler.favPost).get(postHandler.getFavPosts);
router
	.route('/:id')
	.get(postHandler.getOnePost)
	.patch(postHandler.updatePost)
	.delete(postHandler.deletePost);
router
	.route('/archive/:id')
	.patch(postHandler.archivePost)
	.get(postHandler.getOneArchivedPost);

router.route('/unarchive/:id').patch(postHandler.unarchivePost);

export default router;
