import axios from 'axios';
import React, { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal/Modal';
import { v4 as uuidv4 } from 'uuid';

import './style.scss';
import { useAppDispatch } from '../../hooks';
import { CityInfoType, CityType } from '../../redux/cities/types';
import CityCard from '../CityCard';
import { addCity } from '../../redux/cities/slice';

const apiKey = import.meta.env.VITE_API_KEY;

const SearchWeather: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchCity, setSearchCity] = useState('Kyiv');
  const [cities, setCities] = useState<CityInfoType[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const fetchCities = async (searchCity: string) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}`,
    );

    setCities(data);
  };

  const getCities = () => {
    fetchCities(searchCity);
    setIsOpenModal(true);
  };

  const getWeather = (value: string) => {
    setSearchCity(value);
  };

  const clickCityCard = (city: CityInfoType) => {
    const id = uuidv4();
    const cityWithId = { ...city, id };

    localStorage.setItem(JSON.stringify(id), JSON.stringify(cityWithId));

    dispatch(addCity({ info: cityWithId, weather: null }));
    setSearchCity('');
    closeModal();
  };

  return (
    <div className='search'>
      <div className='search__city'>
        <Input value={searchCity} onChange={getWeather} placeholder={'City'} />
        <Button onClick={() => getCities()}>Search</Button>
      </div>

      <Modal onClose={closeModal} isOpen={isOpenModal}>
        <ul className='cardList'>
          {cities.map((city: CityInfoType) => (
            <Button key={city.lat + city.lon + city.name} onClick={() => clickCityCard(city)}>
              <CityCard {...city} />
            </Button>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default SearchWeather;
