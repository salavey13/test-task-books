import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { hashPassword, generateJwtToken, comparePasswords } from '../services/authService';
import { sendAdminConfirmation, sendAdminStatusNotification } from '../services/telegramService';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, telegramId, telegramUsername } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        telegramId,
        telegramUsername,
        role: 0, // Regular user
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await comparePasswords(password, user.password)) {
      const token = generateJwtToken(user.id, user.role);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  const { userId } = req;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
};

// Change user role
export const changeUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role },
    });

    sendAdminStatusNotification(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to change user role' });
  }
};

// Request to become an admin
export const becomeAdmin = async (req: Request, res: Response) => {
  const { userId } = req;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user) {
      sendAdminConfirmation(user);
      res.json({ message: 'Admin confirmation sent' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to request admin status' });
  }
};
