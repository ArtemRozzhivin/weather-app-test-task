import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import SearchWeather from './index';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

test('renders form elements correctly', () => {
  render(
    <Provider store={store}>
      <SearchWeather />
    </Provider>,
  );

  expect(screen.getByText(/Add you city/i)).toBeInTheDocument();
  expect(screen.getByText(/Search/i)).toBeInTheDocument();
  expect(screen.getByText(/Delete all city/i)).toBeInTheDocument();
});
