import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser, changeUserRole, becomeAdmin } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.get('/users/me', authenticateToken, getCurrentUser);
router.put('/users/:id/role', authenticateToken, changeUserRole);
router.post('/users/become-admin', authenticateToken, becomeAdmin);

export default router;
