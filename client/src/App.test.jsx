import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import App from './App';

vi.mock('axios');

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [] });
});

test('renders the site brand name', async () => {
  render(<App />);
  expect(await screen.findByText(/game review/i)).toBeInTheDocument();
});

test('shows a sign in link for a logged-out visitor', async () => {
  render(<App />);
  expect(await screen.findByText(/sign in/i)).toBeInTheDocument();
});
