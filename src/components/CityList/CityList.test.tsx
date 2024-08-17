import { render, screen } from '@testing-library/react';
import CityList from './index';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { beforeEach, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { deleteAllCities } from '../../redux/cities/slice';
import { addCity } from '../../redux/cities/slice';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(
    'city1',
    JSON.stringify({
      name: 'Kyiv',
      lat: 50.4500336,
      lon: 30.5241361,
      country: 'UA',
      id: 'fcf52abe-1654-42d1-871a-03acdd5a67f2',
    }),
  );
  localStorage.setItem(
    'city2',
    JSON.stringify({
      name: 'Malyn',
      lat: 50.7677902,
      lon: 29.2414346,
      country: 'UA',
      state: 'Zhytomyr Oblast',
      id: 'f15f01ac-0de6-49a6-9e00-0f8bb01858a9',
    }),
  );
});

test('CityList renders without crashing', () => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <CityList />
      </MemoryRouter>
    </Provider>,
  );
  expect(container).toBeInTheDocument();
});

test('CityList loads cities from localStorage and dispatches them', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CityList />
      </MemoryRouter>
    </Provider>,
  );

  const cityLinks = screen.getAllByRole('link');
  expect(cityLinks).toHaveLength(2);
  expect(cityLinks[0]).toHaveAttribute('href', '/city/fcf52abe-1654-42d1-871a-03acdd5a67f2');
  expect(cityLinks[1]).toHaveAttribute('href', '/city/f15f01ac-0de6-49a6-9e00-0f8bb01858a9');
});

test('CityList renders without crashing when no cities in localStorage', () => {
  localStorage.clear();
  store.dispatch(deleteAllCities());

  render(
    <Provider store={store}>
      <MemoryRouter>
        <CityList />
      </MemoryRouter>
    </Provider>,
  );

  const cityLinks = screen.queryAllByRole('link');
  expect(cityLinks).toHaveLength(0);
  expect(screen.queryByText(/CityWeatherCard/i)).not.toBeInTheDocument();
});

test('dispatches addCity actions on mount', () => {
  const dispatch = vi.spyOn(store, 'dispatch');

  render(
    <Provider store={store}>
      <MemoryRouter>
        <CityList />
      </MemoryRouter>
    </Provider>,
  );

  const cityLinks = screen.getAllByRole('link');
  expect(cityLinks).toHaveLength(2);
  expect(dispatch).toHaveBeenCalledWith(addCity({ info: expect.any(Object), weather: null }));
});
