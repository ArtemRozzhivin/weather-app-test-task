import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DetailCityWeather from './pages/DetailCityWeather/DetailCityWeather.tsx';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import routes from './routes/index.tsx';

const router = createBrowserRouter([
  {
    path: routes.main,
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: routes.detailWeather,
    element: <DetailCityWeather />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
