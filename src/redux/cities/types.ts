export type CityInfoType = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type CityType = {
  info: { id: string; name: string; lat: number; lon: number; country: string; state?: string };
  weather: null | any;
};

export type CitiesSliceType = {
  cities: CityType[];
  userCity: CityType;
};
