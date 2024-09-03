import axios from 'axios';
import Config from 'react-native-config';

const API_KEY = Config.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';


export const fetchCurrentWeather = async (city: string , type:string) => {
  
  const response = await axios.get(`${BASE_URL}/${type}`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};
