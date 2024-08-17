import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DetailCityWeather from './pages/DetailCityWeather/DetailCityWeather.tsx';
import routes from './routes/index.tsx';
import Main from './pages/Main/index.tsx';

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

  const router = createBrowserRouter([
    {
      path: routes.main,
      element: <Main />,
    },
    {
      path: routes.detailWeather,
      element: <DetailCityWeather />,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
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
      </Provider>
    </>
  );
};

export default App;
