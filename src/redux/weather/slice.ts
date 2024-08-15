import { createSlice } from '@reduxjs/toolkit';
import { currentWeatherType, weatherSliceType } from './types';
import { RootState } from '../store';

const initialState: weatherSliceType = {
  current: {} as currentWeatherType,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
});

export const {} = weatherSlice.actions;

export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;
