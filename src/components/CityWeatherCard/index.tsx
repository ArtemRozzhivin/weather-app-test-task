import React, { useEffect } from 'react';
import { CityType, weatherType } from '../../redux/cities/types';
import { checkTempSign } from '../../utils';
import Button from '../../ui/Button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useAppDispatch } from '../../hooks';
import { addWeatherToCity, deleteCity } from '../../redux/cities/slice';
import { useGetWeatherQuery } from '../../redux/api/apiSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader';

import './style.scss';

const CityWeatherCard = ({ city }: { city: CityType }) => {
  const dispatch = useAppDispatch();
  const { data, isError, error, isLoading, refetch } = useGetWeatherQuery({
    lat: city.info.lat,
    lon: city.info.lon,
  });

  const fetchWeatherByCity = async () => {
    dispatch(addWeatherToCity({ id: city.info.id, weather: data as weatherType }));
  };

  const onDeleteCity = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem(JSON.stringify(city.info.id));
    dispatch(deleteCity(city.info.id));
    toast.success('City deleted');
  };

  const onRefreshWeather = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    refetch();
    toast.success('Weather data updated');
  };

  useEffect(() => {
    fetchWeatherByCity();
  }, [data]);

  return (
    <>
      {isLoading && (
        <div className='cardLoading'>
          <Loader />
        </div>
      )}

      {isError && <div>{error as string}</div>}
      {city.weather && (
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
              <div>{checkTempSign(city.weather.current.temp)}°C</div>
              <img
                width={80}
                height={80}
                src={`https://openweathermap.org/img/wn/${city.weather.current.weather[0].icon}.png`}
                alt='weather'
              />
            </div>

            <div>{city.weather.current.weather[0].main}</div>

            <div>Feels like: {checkTempSign(city.weather.current.feels_like)}°C</div>

            <div className='card__buttonContainer'>
              <Button className='card__button' onClick={(e) => onRefreshWeather(e)}>
                Update data
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CityWeatherCard;
