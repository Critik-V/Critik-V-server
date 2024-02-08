import { Router } from 'express';
import { userHandler } from '../handlers';

const router = Router();

router.route('/').post(userHandler.createUser).patch(userHandler.updateUser);

export default router;
