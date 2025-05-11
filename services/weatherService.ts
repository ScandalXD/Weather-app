import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OPEN_WEATHER_API_KEY } from './config';

const CURRENT_KEY = 'WEATHER_DATA';
const FORECAST_KEY = 'FORECAST_DATA';

export const getWeather = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') throw new Error('Permission denied');

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=ru`;
    const currentRes = await axios.get(currentUrl);

    const current = {
      city: currentRes.data.name,
      temperature: currentRes.data.main.temp,
      description: currentRes.data.weather[0].description,
      icon: currentRes.data.weather[0].icon,
    };

    await AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(current));

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=ru`;
    const forecastRes = await axios.get(forecastUrl);

    const forecastList = forecastRes.data.list.map((entry: any) => ({
      dt_txt: entry.dt_txt,
      temp: entry.main.temp,
      icon: entry.weather[0].icon,
      description: entry.weather[0].description,
    }));

    await AsyncStorage.setItem(FORECAST_KEY, JSON.stringify(forecastList));

    return { current, forecast: forecastList };
  } catch (error) {
    console.error('Ошибка загрузки погоды:', error);

    const current = await AsyncStorage.getItem(CURRENT_KEY);
    const forecast = await AsyncStorage.getItem(FORECAST_KEY);

    if (current && forecast) {
      console.warn('⚠️ Используются кешированные данные');
      return {
        current: JSON.parse(current),
        forecast: JSON.parse(forecast),
      };
    }

    throw error;
  }
};

export const getWeatherByCity = async (city: string) => {
  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=ru`;
    const currentRes = await axios.get(currentUrl);

    const current = {
      city: currentRes.data.name,
      temperature: currentRes.data.main.temp,
      description: currentRes.data.weather[0].description,
      icon: currentRes.data.weather[0].icon,
    };

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=ru`;
    const forecastRes = await axios.get(forecastUrl);

    const forecastList = forecastRes.data.list.map((entry: any) => ({
      dt_txt: entry.dt_txt,
      temp: entry.main.temp,
      icon: entry.weather[0].icon,
      description: entry.weather[0].description,
    }));

    return { current, forecast: forecastList };
  } catch (error) {
    console.error('Ошибка загрузки погоды по городу:', error);
    throw error;
  }
};
