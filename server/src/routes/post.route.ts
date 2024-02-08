import { Router } from 'express';
import multer from 'multer';
import { postHandler } from '../handlers';

const upload = multer({
	storage: multer.memoryStorage(),
});

const router = Router();

router
	.route('/')
	.get(postHandler.getNewestPosts)
	.post(upload.single('resume'), postHandler.makePost);
router.route('/mine').get(postHandler.getMyPosts);
router
	.route('/:id')
	.get(postHandler.getOnePost)
	.patch(postHandler.modifyPost)
	.delete(postHandler.deletePost)
	.post(postHandler.archivePost);
router.route('/archived').get(postHandler.getArchivedPosts);
router.route('/archive/:id').post(postHandler.getOneArchivedPost);
router.route('/fav').post(postHandler.favPost).get(postHandler.getFavPosts);

export default router;
