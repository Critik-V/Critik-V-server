import { Router } from 'express';
import multer from 'multer';
import { postHandler } from '../handlers';

const upload = multer({
	storage: multer.memoryStorage(),
});

const router = Router();

router.route('/').post(upload.single('resume'), postHandler.makePost);

export default router;
