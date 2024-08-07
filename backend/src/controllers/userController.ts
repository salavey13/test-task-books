import { Request, Response } from 'express';
import supabase from '../supabaseClient';
import { hashPassword, comparePasswords, generateJwtToken } from '../services/authService';
import { sendAdminConfirmation, sendAdminStatusNotification } from '../services/telegramService';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, telegramId, telegramUsername } = req.body;

  // Manually hashing the password and storing user data in a custom table
  const hashedPassword = await hashPassword(password);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword, telegram_id: telegramId, telegram_username: telegramUsername, role: 0 }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user || !(await comparePasswords(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateJwtToken(user.id, user.role);
  res.json({ token });
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  const { userId } = req;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return res.status(500).json({ error: 'Failed to get user' });
  }

  res.json(user);
};

// Change user role
export const changeUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  const { data: updatedUser, error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: 'Failed to change user role' });
  }

  sendAdminStatusNotification(updatedUser);
  res.json(updatedUser);
};

// Request to become an admin
export const becomeAdmin = async (req: Request, res: Response) => {
  const { userId } = req;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !user) {
    return res.status(404).json({ error: 'User not found' });
  }

  sendAdminConfirmation(user);
  res.json({ message: 'Admin confirmation sent' });
};
