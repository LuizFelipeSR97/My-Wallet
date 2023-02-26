import { Router } from 'express';
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/transactions', authMiddleware, getTransactions);
router.post('/transaction', authMiddleware, createTransaction);
router.put('/transaction', authMiddleware, updateTransaction);
router.delete('/transaction/:transactionId', authMiddleware, deleteTransaction);

export default router;
