import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = import.meta.env.VITE_API_KEY;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    getCities: build.query({
      query: ({ searchCity }) => ({
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}`,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.data.message,
    }),

    getWeather: build.query({
      query: ({ lat, lon }) => ({
        url: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ua&exclude=minutely,alerts&appid=${apiKey}`,
      }),
      transformResponse: (response) => response,
      //@ts-ignore
      transformErrorResponse: (response) => response.data.message,
    }),
  }),
});

export const { useGetWeatherQuery, useGetCitiesQuery } = apiSlice;
