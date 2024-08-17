import { Request, Response } from 'express';
import supabase from '../supabaseClient';

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  const { data: books, error } = await supabase.from('books').select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(books);
};

// Get a single book by ID
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data: book, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  const { title, author, publishedDate } = req.body;

  const { data: book, error } = await supabase
    .from('books')
    .insert([{ title, author, published_date: publishedDate }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(book);
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, publishedDate } = req.body;

  const { data: book, error } = await supabase
    .from('books')
    .update({ title, author, published_date: publishedDate })
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(book);
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase.from('books').delete().eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(204).send();
};