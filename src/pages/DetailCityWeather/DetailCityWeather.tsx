import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectItemById } from '../../redux/cities/slice';
import { checkTempSign, convertUnixToUkrainianDate, getWindDirection } from '../../utils';
import { Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';

import './style.scss';

const DetailCityWeather = () => {
  const { cityId } = useParams();
  const city = useAppSelector((state) => selectItemById(state, cityId));
  const date = city?.weather ? convertUnixToUkrainianDate(city.weather.current.dt) : null;
  const sunrise = city?.weather ? convertUnixToUkrainianDate(city.weather.current.sunrise) : null;
  const sunset = city?.weather ? convertUnixToUkrainianDate(city.weather.current.sunset) : null;

  const { xAxisData, tempData } = useMemo(() => {
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
  }, [city?.weather?.hourly ?? []]);

  return (
    <>
      {!city ? (
        <div>Loading...</div>
      ) : (
        <div className='detail'>
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
                <div>
                  <div className='weather__temp'>{checkTempSign(city.weather.current.temp)}°C</div>
                </div>
                <img
                  width={80}
                  height={80}
                  src={`http://openweathermap.org/img/wn/${city.weather.current.weather[0].icon}.png`}
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
                <div>{city.weather.current.humidity}%</div>
              </div>
              <div className='dopInfo__block'>
                Pressure
                <div>{city.weather.current.pressure} mm Hg. Art.</div>
              </div>
              <div className='dopInfo__block'>
                Cloudiness
                <div>{city.weather.current.clouds}%</div>
              </div>
              <div className='dopInfo__block'>
                Uvi
                <div>{city.weather.current.uvi}</div>
              </div>
            </div>
          </div>

          <Divider />

          <div className='detail__wind wind'>
            <h3 className='wind__title blockTitle'>Wind information</h3>
            <div className='wind__container'>
              <div className='wind__block'>
                Wind speed
                <div className='text-2xl'>{city.weather.current.wind_speed} m/s</div>
              </div>

              <div className='wind__block'>
                Wind direction
                <div className='text-2xl'>{getWindDirection(city.weather.current.wind_deg)}</div>
              </div>
            </div>
          </div>

          <Divider />

          <div className='detail__sunrise sunrise'>
            <h3 className='sunrise__title blockTitle'>Sunrise information</h3>
            <div className='sunrise__container'>
              <div className='sunrise__block'>
                Sunrise time
                <div className='text-2xl'>{sunrise?.time}</div>
              </div>
              <div className='sunrise__block'>
                Sunset time
                <div className='text-2xl'>{sunset?.time}</div>
              </div>
            </div>
          </div>

          <Divider />

          <div className='detail__graph graph'>
            <h3 className='graph__title blockTitle'>Hourly temperature for the current day</h3>
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
                  },
                ]}
                grid={{ vertical: true, horizontal: true }}
                width={800}
                height={400}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailCityWeather;
