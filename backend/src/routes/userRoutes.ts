import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser, changeUserRole, becomeAdmin } from '../controllers/userController';
import { authenticateUser, authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.get('/users/me', authenticateUser, getCurrentUser);
router.put('/users/:id/role', authenticateAdmin, changeUserRole);
router.post('/users/become-admin', authenticateUser, becomeAdmin);

export default router;
