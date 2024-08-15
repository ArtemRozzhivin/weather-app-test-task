import { Divider } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const DetailCityWeather = () => {
  const { cityId } = useParams();
  const city = useAppSelector((state) => state.cities.cities);

  return <div>City</div>;
};

export default DetailCityWeather;
