import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import CityWeatherCard from './index';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

test('CityWeatherCard renders loading state correctly', async () => {
  vi.mock('../../redux/api/apiSlice', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...(actual as Object),
      useGetWeatherQuery: vi.fn(() => ({
        data: null,
        isLoading: true,
        isError: false,
        error: null,
        refetch: vi.fn(),
      })),
    };
  });

  const city = {
    info: {
      id: '1',
      name: 'Kyiv',
      country: 'UA',
      state: 'Kyiv Oblast',
      lat: 50.4500336,
      lon: 30.5241361,
    },
    weather: null,
  };

  render(
    <Provider store={store}>
      <MemoryRouter>
        <CityWeatherCard city={city} />
      </MemoryRouter>
    </Provider>,
  );

  await waitFor(() => {
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});

