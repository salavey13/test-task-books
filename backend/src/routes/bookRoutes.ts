import { Router } from 'express';
import { addBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/books', authenticateAdmin, addBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', authenticateAdmin, updateBook);
router.delete('/books/:id', authenticateAdmin, deleteBook);

export default router;
