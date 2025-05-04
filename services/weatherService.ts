import axios from 'axios';
import * as Location from 'expo-location';
import { OPEN_WEATHER_API_KEY } from './config';

export const getWeather = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=ru`;
    const response = await axios.get(url);

    const data = response.data;
    return {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
  } catch (error) {
    console.error('Ошибка получения погоды:', error);
    throw error;
  }
};
