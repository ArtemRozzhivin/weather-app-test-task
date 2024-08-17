import SearchWeather from './components/SearchWeather/SearchWeather';
import CityList from './components/CityList';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2c67b5',
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='wrapper'>
          <div className='app'>
            <div className='app__container'>
              <SearchWeather />
              <CityList />
            </div>
          </div>
        </div>
        <ToastContainer
          position='bottom-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </ThemeProvider>
    </>
  );
};

export default App;
