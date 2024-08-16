import React, { useEffect } from 'react';
import { CityType } from '../../redux/cities/types';
import axios from 'axios';
import { checkTempSign, convertUnixToUkrainianDate } from '../../utils';
import './style.scss';
import Button from '../../ui/Button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useAppDispatch } from '../../hooks';
import { addWeatherToCity, deleteCity } from '../../redux/cities/slice';
import { useGetWeatherQuery } from '../../redux/api/apiSlice';

const apiKey = import.meta.env.VITE_API_KEY;

const CityWeatherCard = ({ city }: { city: CityType }) => {
  const dispatch = useAppDispatch();
  const { data, isError, error, isSuccess, isLoading } = useGetWeatherQuery({
    lat: city.info.lat,
    lon: city.info.lon,
  });

  const fetchWeatherByCity = async () => {
    dispatch(addWeatherToCity({ id: city.info.id, weather: data }));
  };

  const onDeleteCity = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem(JSON.stringify(city.info.id));
    dispatch(deleteCity(city.info.id));
  };

  const onRefreshWeather = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fetchWeatherByCity();
  };

  useEffect(() => {
    fetchWeatherByCity();
  }, [data]);

  return (
    <>
      {!city.weather ? (
        <div>Loading...</div>
      ) : (
        <div className='card'>
          <div className='card__delete'>
            <button type='button' onClick={onDeleteCity}>
              <XMarkIcon className='card__icon' />
            </button>
          </div>
          <div className='card__container'>
            <div className='card__title'>
              <span>
                {city.info.name}, {city.info.country}, {city.info?.state}
              </span>
            </div>

            <div>
              <div className='text-7xl'>{checkTempSign(city.weather.current.temp)}°C</div>
              <img
                width={80}
                height={80}
                src={`http://openweathermap.org/img/wn/${city.weather.current.weather[0].icon}.png`}
                alt='weather'
              />
            </div>

            <div>Feels like: {checkTempSign(city.weather.current.feels_like)}°C</div>

            <div>
              {city.weather.current.weather[0].main}
              {/* or current.weather[0].description */}
            </div>

            <Button onClick={(e) => onRefreshWeather(e)}>Update data</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CityWeatherCard;
