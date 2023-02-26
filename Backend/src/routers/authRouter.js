import { Router } from 'express';
import {
  signUp,
  signIn,
  getUserInfo,
  deleteSession
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.get('/userInfo', authMiddleware, getUserInfo);
router.delete('/session', authMiddleware, deleteSession);

export default router;
