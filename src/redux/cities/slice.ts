import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesSliceType, CityType } from './types';
import { RootState } from '../store';

export const initialState: CitiesSliceType = {
  cities: [],
  userCity: {} as CityType,
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addUserCity: (state, action: PayloadAction<CityType>) => {
      state.userCity = action.payload;
    },
    addCity: (state, action: PayloadAction<CityType>) => {
      state.cities = [...state.cities, action.payload];
    },

    addWeatherToCity: (state, action: PayloadAction<{ id: string; weather: any }>) => {
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
  },
});

export const { addUserCity, addCity, addWeatherToCity, deleteCity } = citiesSlice.actions;

export const selectCities = (state: RootState) => state.cities;

export const selectItemById = (state: RootState, itemId: string) => {
  return state.cities.cities.find((item) => item.info.id === itemId);
};

export default citiesSlice.reducer;
