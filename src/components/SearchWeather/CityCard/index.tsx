import React from 'react';

import './style.scss';

export interface CityCardInterface {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

const CiryCard: React.FC<CityCardInterface> = ({ name, lat, lon, country, state }) => {
  return (
    <div className='cityCard'>
      <div>
        {name}, {country}
        {state && <span>, {state}</span>}
      </div>
      <div className='cityCard__location'>
        <span>lat: {lat},</span> <span>lon: {lon}</span>
      </div>
    </div>
  );
};

export default CiryCard;
