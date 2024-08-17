import SearchWeather from '../../components/SearchWeather/SearchWeather';
import CityList from '../../components/CityList';

import './style.scss';

const Main = () => {
  return (
    <div className='wrapper'>
      <div className='main'>
        <div className='main__container'>
          <SearchWeather />
          <CityList />
        </div>
      </div>
    </div>
  );
};

export default Main;
