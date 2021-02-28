import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn login link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Logowanie/i);
  expect(linkElement).toBeInTheDocument();
});
