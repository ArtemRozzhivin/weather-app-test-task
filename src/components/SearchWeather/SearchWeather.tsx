import axios from 'axios';
import React, { useState } from 'react';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal/Modal';
import { v4 as uuidv4 } from 'uuid';

import './style.scss';
import { useAppDispatch } from '../../hooks';
import { CityInfoType } from '../../redux/cities/types';
import CityCard from './CityCard';
import { addCity, deleteAllCities } from '../../redux/cities/slice';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiSlice } from '../../redux/api/apiSlice';

const schema = yup.object({
  city: yup.string().required('City is required'),
});

const SearchWeather: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    getFieldState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      city: '',
    },
  });

  const onSubmit = (data: { city: string }) => {
    if (!(errors.city && getFieldState('city').isDirty)) {
      trigger({ searchCity: data.city });
    }

    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const [trigger, { data, isError, error, isSuccess, isLoading }] =
    apiSlice.endpoints.getCities.useLazyQuery();

  const clickCityCard = (city: CityInfoType) => {
    const id = uuidv4();
    const cityWithId = { ...city, id };

    localStorage.setItem(JSON.stringify(id), JSON.stringify(cityWithId));

    dispatch(addCity({ info: cityWithId, weather: null }));
    reset();

    closeModal();
  };

  const onDeleteAllCities = () => {
    localStorage.clear();
    dispatch(deleteAllCities());
  };

  return (
    <div className='search'>
      <form onSubmit={handleSubmit(onSubmit)} className='search__city'>
        <h1 className='search__title'>Add you city</h1>
        <Controller
          name='city'
          control={control}
          render={({ field }) => (
            <Input error={errors.city?.message} placeholder={'City'} {...field} />
          )}
        />

        <div className='search__buttonBlock'>
          <Button className='search__button' type='submit'>
            Search
          </Button>
          <Button
            color='error'
            className='search__button'
            onClick={onDeleteAllCities}
            type='button'>
            Delete all city
          </Button>
        </div>
      </form>

      <Modal onClose={closeModal} isOpen={isOpenModal}>
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error as string}</div>}
        {isSuccess && (
          <div className='search__cities'>
            {data.map((city: CityInfoType) => (
              <Button key={city.lat + city.lon + city.name} onClick={() => clickCityCard(city)}>
                <CityCard {...city} />
              </Button>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchWeather;
