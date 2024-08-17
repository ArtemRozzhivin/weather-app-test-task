import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import CityCard from './index';

const city = {
  name: 'Kyiv',
  lat: 50.4500336,
  lon: 30.5241361,
  country: 'UA',
  state: 'Kyiv Oblast',
};

test('CityCard renders correctly with required props', () => {
  render(<CityCard {...city} />);

  expect(screen.getByText(/Kyiv, UA/i)).toBeInTheDocument();
  expect(screen.getByText(/Kyiv Oblast/i)).toBeInTheDocument();

  expect(screen.getByText(/lat: 50.4500336,/i)).toBeInTheDocument();
  expect(screen.getByText(/lon: 30.5241361/i)).toBeInTheDocument();
});
