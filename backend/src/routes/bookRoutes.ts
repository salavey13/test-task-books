import { Router } from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/books', authenticateToken, createBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', authenticateToken, updateBook);
router.delete('/books/:id', authenticateToken, deleteBook);

export default router;
