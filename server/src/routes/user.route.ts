import { Router } from 'express';
import { userHandler } from '../handlers';

const router = Router();

router.route('/').post(userHandler.createUser);

export default router;
