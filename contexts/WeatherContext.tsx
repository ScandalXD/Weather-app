import React, { createContext, useContext, useState } from 'react';

interface ForecastItem {
  dt_txt: string;
  temp: number;
  icon: string;
  description: string;
}

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  forecast?: ForecastItem[];
  fromSearch?: boolean;
  lastCity?: string;
}

interface WeatherContextProps {
  weather: WeatherData | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextProps => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
