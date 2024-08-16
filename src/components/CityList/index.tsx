import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CityWeatherCard from '../CityWeatherCard';
import { useEffect } from 'react';
import { addCity } from '../../redux/cities/slice';

import './style.scss';

const CityList = () => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);

  const getAllLocalStorageItems = () => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        value && items.push(JSON.parse(value));
      }
    }
    return items;
  };

  useEffect(() => {
    const userCities = getAllLocalStorageItems();

    userCities.forEach((city) => {
      dispatch(addCity({ info: city, weather: null }));
    });
  }, []);

  return (
    <div className='list'>
      {cities.map((city) => (
        <Link to={`city/${city.info.id}`} key={city.info.id}>
          <CityWeatherCard city={city} />
        </Link>
      ))}
    </div>
  );
};

export default CityList;
