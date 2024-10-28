// Counter.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from '@/components/counter'

it('Counter functionality', () => {
  const { getByText, getByTestId } = render(<Counter />);

  // Initial assertion: count should be 0
  expect(getByTestId('count')).toHaveTextContent('0');

  // Click the increase button and check count
  fireEvent.click(getByText('Increase'));
  expect(getByTestId('count')).toHaveTextContent('1');

  // Click the decrease button and check count
  fireEvent.click(getByText('Decrease'));
  expect(getByTestId('count')).toHaveTextContent('0');

  // Click the decrease button again and check count
  fireEvent.click(getByText('Decrease'));
  expect(getByTestId('count')).toHaveTextContent('-1');
});
