import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CityWeatherCard from '../CityWeatherCard';

import './style.scss';
import { useEffect } from 'react';
import { addCity } from '../../redux/cities/slice';

const CityList = () => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);

  console.log(cities);

  const getAllLocalStorageItems = () => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      value && items.push(JSON.parse(value));
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
