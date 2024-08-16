export const checkTempSign = (temp: number) => {
  return temp < 0 ? `-${temp}` : `+${temp}`;
};

export const getLatLon = (arr: [string, string]): { lat: number; lon: number } => {
  return {
    lat: Number(arr[0]),
    lon: Number(arr[1]),
  };
};

export const getWindDirection = (degrees: number): string => {
  const directions = [
    'North',
    'Northeast',
    'East',
    'Southeast',
    'South',
    'Southwest',
    'West',
    'Northwest',
  ];
  const index = Math.round((degrees % 360) / 45);
  return directions[index % 8];
};

export const convertUnixToUkrainianDate = (unixDate: number) => {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  const date = new Date(unixDate * 1000);

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const dayNum = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return {
    dayOfWeek,
    dayNum,
    month,
    time,
  };
};
