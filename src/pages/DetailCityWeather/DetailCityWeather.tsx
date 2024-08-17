import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectItemById } from '../../redux/cities/slice';
import { checkTempSign, convertUnixToUkrainianDate, getWindDirection } from '../../utils';
import { Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import routes from '../../routes';

import './style.scss';

const DetailCityWeather = () => {
  const { cityId = '' } = useParams();
  const city = useAppSelector((state) => selectItemById(state, cityId));
  const date = city?.weather ? convertUnixToUkrainianDate(city.weather.current.dt) : null;
  const sunrise = city?.weather ? convertUnixToUkrainianDate(city.weather.current.sunrise) : null;
  const sunset = city?.weather ? convertUnixToUkrainianDate(city.weather.current.sunset) : null;

  const getGraphData = () => {
    const xAxisData: number[] = [];
    const tempData: number[] = [];

    city?.weather?.hourly?.forEach((entry: { dt: number; temp: number }) => {
      const entryDate = new Date(entry.dt * 1000);
      const entryHour = entryDate.getHours();

      if (entryDate.getDate() === new Date().getDate()) {
        xAxisData.push(entryHour);
        tempData.push(entry.temp);
      }
    });

    return { xAxisData, tempData };
  };

  const { xAxisData, tempData } = useMemo(getGraphData, [city?.weather?.hourly ?? []]);

  return (
    <>
      <div className='wrapper'>
        <div className='detail'>
          <Link to={routes.main} className='detail__back'>
            <ArrowLeftIcon className='detail__backIcon' /> <span>Back</span>
          </Link>
          {!city || !city.weather ? (
            <div className='detail__error'>
              <h3>City not found 😞</h3>
              <h4>Try to find another city</h4>
            </div>
          ) : (
            <>
              <div className='detail__container'>
                <div className='detail__mainInfo'>
                  <div>
                    <div className='detail__place'>
                      {city.info.name}, {city.info.country}, {city.info.state}
                    </div>
                    {date && (
                      <div className='detail__time'>
                        {date.dayNum} {date.month} {date.dayOfWeek}, {date.time}
                      </div>
                    )}
                  </div>

                  <div className='detail__weather weather'>
                    <div className='weather__container'>
                      <div className='weather__tempBlock'>
                        <div className='weather__temp'>
                          {checkTempSign(city.weather.current.temp)}°C
                        </div>
                        <div>Feels like: {checkTempSign(city.weather.current.feels_like)}°C</div>
                      </div>
                      <img
                        width={80}
                        height={80}
                        src={`https://openweathermap.org/img/wn/${city.weather.current.weather[0].icon}.png`}
                        alt='weather'
                      />

                      <div>{city.weather.current.weather[0].main}</div>
                    </div>
                  </div>
                </div>

                <Divider />

                <div className='detail__dopInfo dopInfo'>
                  <h3 className='dopInfo__title blockTitle'>Additional information</h3>
                  <div className='dopInfo__container'>
                    <div className='dopInfo__block'>
                      Humidity
                      <div className='valueTitle'>{city.weather.current.humidity}%</div>
                    </div>
                    <div className='dopInfo__block'>
                      Pressure
                      <div className='valueTitle'>{city.weather.current.pressure} mm Hg. Art.</div>
                    </div>
                    <div className='dopInfo__block'>
                      Cloudiness
                      <div className='valueTitle'>{city.weather.current.clouds}%</div>
                    </div>
                    <div className='dopInfo__block'>
                      Uvi
                      <div className='valueTitle'>{city.weather.current.uvi}</div>
                    </div>
                  </div>
                </div>

                <Divider />

                <div className='detail__thirdInfo'>
                  <div className='detail__wind wind'>
                    <h3 className='wind__title blockTitle'>Wind information</h3>
                    <div className='wind__container'>
                      <div className='wind__block'>
                        Wind speed
                        <div className='valueTitle'>{city.weather.current.wind_speed} m/s</div>
                      </div>

                      <div className='wind__block'>
                        Wind direction
                        <div className='valueTitle'>
                          {getWindDirection(city.weather.current.wind_deg)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='detail__sunrise sunrise'>
                    <h3 className='sunrise__title blockTitle'>Sunrise information</h3>
                    <div className='sunrise__container'>
                      <div className='sunrise__block'>
                        Sunrise time
                        <div className='valueTitle'>{sunrise?.time}</div>
                      </div>
                      <div className='sunrise__block'>
                        Sunset time
                        <div className='valueTitle'>{sunset?.time}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Divider />

                <div className='detail__graph graph'>
                  <h3 className='graph__title blockTitle'>
                    Hourly temperature for the current day
                  </h3>
                  <div className='graph__container'>
                    <LineChart
                      xAxis={[
                        {
                          data: xAxisData,
                          label: 'Hours, 00:00 - 24:00',
                        },
                      ]}
                      series={[
                        {
                          curve: 'linear',
                          data: tempData,
                          label: 'Temperature, °C',
                          color: '#1e90ff',
                        },
                      ]}
                      grid={{ vertical: true, horizontal: true }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailCityWeather;
