import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Get a single book by ID
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  const { title, author, publishedDate } = req.body;

  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publishedDate: new Date(publishedDate),
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, publishedDate } = req.body;

  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        publishedDate: new Date(publishedDate),
      },
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};