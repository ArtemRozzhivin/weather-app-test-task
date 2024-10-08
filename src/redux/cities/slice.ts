import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesSliceType, CityType, weatherType } from './types';
import { RootState } from '../store';

export const initialState: CitiesSliceType = {
  cities: [],
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<CityType>) => {
      if (state.cities.find((city) => city.info.id === action.payload.info.id)) return;

      state.cities = [...state.cities, action.payload];
    },

    addWeatherToCity: (state, action: PayloadAction<{ id: string; weather: weatherType }>) => {
      const cityIndex = state.cities.findIndex((city) => city.info.id === action.payload.id);

      if (cityIndex !== -1) {
        state.cities[cityIndex] = {
          ...state.cities[cityIndex],
          weather: action.payload.weather,
        };
      }
    },

    deleteCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter((city) => city.info.id !== action.payload);
    },

    deleteAllCities: (state) => {
      state.cities = [];
    },
  },
});

export const { addCity, addWeatherToCity, deleteCity, deleteAllCities } = citiesSlice.actions;

export const selectCities = (state: RootState) => state.cities;

export const selectItemById = (state: RootState, itemId: string) => {
  return state.cities.cities.find((item) => item.info.id === itemId);
};

export default citiesSlice.reducer;
