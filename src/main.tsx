import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DetailCityWeather from './pages/DetailCityWeather.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: 'city/:cityId',
    element: <DetailCityWeather />,
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  // </StrictMode>,
);
