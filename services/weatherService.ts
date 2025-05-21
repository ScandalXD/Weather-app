import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from './config';

interface WeatherEntry {
  dt_txt: string;
  temp: number;
  icon: string;
  description: string;
}

interface CurrentWeather {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}

interface WeatherResponse {
  current: CurrentWeather;
  forecast: WeatherEntry[];
}

const CURRENT_KEY = 'WEATHER_DATA';
const FORECAST_KEY = 'FORECAST_DATA';

const axiosInstance = axios.create({
  timeout: 5000, 
  baseURL: 'https://api.openweathermap.org/data/2.5',
  headers: {
    Accept: 'application/json',
  },
});

const parseForecast = (data: any): WeatherEntry[] => {
  if (!data?.list || !Array.isArray(data.list)) return [];
  return data.list.map((entry: any): WeatherEntry => ({
    dt_txt: entry.dt_txt ?? '',
    temp: entry.main?.temp ?? 0,
    icon: entry.weather?.[0]?.icon ?? '01d',
    description: entry.weather?.[0]?.description ?? 'brak opisu',
  }));
};

const parseCurrent = (data: any): CurrentWeather => ({
  city: data.name ?? 'Nieznane',
  temperature: data.main?.temp ?? 0,
  description: data.weather?.[0]?.description ?? 'brak opisu',
  icon: data.weather?.[0]?.icon ?? '01d',
});

const fetchWeatherData = async (urlCurrent: string, urlForecast: string): Promise<WeatherResponse> => {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      axiosInstance.get(urlCurrent),
      axiosInstance.get(urlForecast),
    ]);

    const current = parseCurrent(currentRes.data);
    const forecast = parseForecast(forecastRes.data);

    return { current, forecast };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Błąd API:', error.message);
    } else {
      console.error('Nieznany błąd:', error);
    }
    throw error;
  }
};

export const getWeather = async (): Promise<WeatherResponse> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') throw new Error('Brak zgody na lokalizację');

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const currentUrl = `/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pl`;
    const forecastUrl = `/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pl`;

    const data = await fetchWeatherData(currentUrl, forecastUrl);

    await AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(data.current));
    await AsyncStorage.setItem(FORECAST_KEY, JSON.stringify(data.forecast));

    return data;
  } catch (error) {
    console.warn('Używane są dane z pamięci podręcznej');

    const current = await AsyncStorage.getItem(CURRENT_KEY);
    const forecast = await AsyncStorage.getItem(FORECAST_KEY);

    if (current && forecast) {
      return {
        current: JSON.parse(current),
        forecast: JSON.parse(forecast),
      };
    }

    throw error;
  }
};

export const getWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  const currentUrl = `/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;
  const forecastUrl = `/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;
  return await fetchWeatherData(currentUrl, forecastUrl);
};
