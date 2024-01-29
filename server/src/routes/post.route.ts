import { Router } from 'express';
import multer from 'multer';
import { postHandler } from '../handlers';

const upload = multer({
	storage: multer.memoryStorage(),
});

const router = Router();

router
	.route('/')
	.get(postHandler.getMyPosts)
	.post(upload.single('resume'), postHandler.makePost);
router
	.route('/:id')
	.patch(postHandler.modifyPost)
	.delete(postHandler.deletePost)
	.post(postHandler.archivePost);
router.route('/archived').get(postHandler.getArchivedPosts);
router.route('/archive/:id').post(postHandler.getOneArchivedPost);

export default router;
