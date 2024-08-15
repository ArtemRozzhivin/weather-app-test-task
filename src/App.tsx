import axios from 'axios';
import SearchWeather from './components/SearchWeather/SearchWeather';
import CityList from './components/CityList';

import './App.scss';

const App = () => {
  return (
    <div className='app'>
      <SearchWeather />

      <CityList />
    </div>
  );
};

export default App;
