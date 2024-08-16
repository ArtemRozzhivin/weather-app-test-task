import axios from 'axios';
import React, { useState } from 'react';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal/Modal';
import { v4 as uuidv4 } from 'uuid';

import './style.scss';
import { useAppDispatch } from '../../hooks';
import { CityInfoType } from '../../redux/cities/types';
import CityCard from '../CityCard';
import { addCity } from '../../redux/cities/slice';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const apiKey = import.meta.env.VITE_API_KEY;

const schema = yup.object({
  city: yup.string().required('City is required'),
});

const SearchWeather: React.FC = () => {
  const dispatch = useAppDispatch();
  const [cities, setCities] = useState<CityInfoType[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      city: '',
    },
  });

  const onSubmit = (data: { city: string }) => {
    fetchCities(data.city);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const fetchCities = async (searchCity: string) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}`,
    );

    setCities(data);
  };

  const clickCityCard = (city: CityInfoType) => {
    const id = uuidv4();
    const cityWithId = { ...city, id };

    localStorage.setItem(JSON.stringify(id), JSON.stringify(cityWithId));

    dispatch(addCity({ info: cityWithId, weather: null }));
    reset();

    closeModal();
  };

  return (
    <div className='search'>
      <form onSubmit={handleSubmit(onSubmit)} className='search__city'>
        <Controller
          name='city'
          control={control}
          render={({ field }) => (
            <Input error={errors.city?.message} placeholder={'City'} {...field} />
          )}
        />

        <Button type='submit'>Search</Button>
      </form>

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
