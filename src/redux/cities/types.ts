export type CityType = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

export type CitiesSliceType = {
  cities: CityType[];
  userCity: CityType;
};
