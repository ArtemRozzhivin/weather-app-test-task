import SearchWeather from './components/SearchWeather/SearchWeather';
import CityList from './components/CityList';

import './App.scss';
import { createTheme, ThemeProvider } from '@mui/material';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2c67b5',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className='wrapper'>
        <div className='app'>
          <div className='app__container'>
            <SearchWeather />

            <CityList />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
