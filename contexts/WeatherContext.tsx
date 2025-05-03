import React, { createContext, useState, useContext } from 'react';

interface WeatherData {
  temperature: number;
  description: string;
  city: string;
}

interface WeatherContextType {
  weather: WeatherData | null;
  setWeather: (data: WeatherData) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used inside WeatherProvider');
  return context;
};
