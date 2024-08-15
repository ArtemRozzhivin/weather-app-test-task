import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  },
});

export const { addUserCity } = citiesSlice.actions;

export const selectCities = (state: RootState) => state.cities;

export default citiesSlice.reducer;
