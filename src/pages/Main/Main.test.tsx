import { render, screen } from '@testing-library/react';
import Main from './index';
import { expect, test, vi } from 'vitest';

vi.mock('../../components/SearchWeather', () => ({
  __esModule: true,
  default: () => <div>SearchWeather Mock</div>,
}));

vi.mock('../../components/CityList', () => ({
  __esModule: true,
  default: () => <div>CityList Mock</div>,
}));

test('renders SearchWeather and CityList components', () => {
  render(<Main />);

  expect(screen.getByText('SearchWeather Mock')).toBeInTheDocument();

  expect(screen.getByText('CityList Mock')).toBeInTheDocument();
});
