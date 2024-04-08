import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('renders BoardsPage by default', () => {
  render(<App />);
  const boardsPageElement = screen.getByText(/BoardsPage/i);
  expect(boardsPageElement).toBeInTheDocument();
});
