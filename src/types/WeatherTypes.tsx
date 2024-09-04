export interface Weather {
  description: string;
  main: string;
}

export interface Main {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface Sys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  deg: number;
  speed: number;
}

export interface WeatherData {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  main: Main;
  name: string;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: Wind;
}

export interface WeatherState {
  weather: Weather | null;
  isLoading: boolean;
  error: number | null;
}

export interface AppState {
  weather: WeatherState;
}

export interface TodayWeather extends WeatherData {}
