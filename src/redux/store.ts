import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './cities/slice';
import locationsReducer from './locations/slice';
import weatherReducer from './Weather/slice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    cities: citiesReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
