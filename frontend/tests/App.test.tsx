// frontend/src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Books Collection/i);
  expect(linkElement).toBeInTheDocument();
});
