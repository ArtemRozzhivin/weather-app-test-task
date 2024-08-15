import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locations, LocationsSliceType } from './types';
import { RootState } from '../store';

export const initialState: LocationsSliceType = {
  userLocation: {} as Locations,
  currentLocation: {} as Locations,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    changeCurrentLocation: (state, action: PayloadAction<Locations>) => {
      state.currentLocation = action.payload;
    },
  },
});

export const { changeCurrentLocation } = locationsSlice.actions;

export const selectLocations = (state: RootState) => state.locations;

export default locationsSlice.reducer;
