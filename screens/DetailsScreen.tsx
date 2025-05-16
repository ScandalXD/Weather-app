import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { useWeather } from '../contexts/WeatherContext';
import ForecastList from '../components/ForecastList';
import FiveDayForecastBlock from '../components/FiveDayForecastBlock';
import { getWeather, getWeatherByCity } from '../services/weatherService';
import { globalStyles } from '../style/styles';

const DetailsScreen = () => {
  const { weather, setWeather } = useWeather();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      let data;

      if (weather?.fromSearch && weather?.lastCity) {
        data = await getWeatherByCity(weather.lastCity);
      } else {
        data = await getWeather();
      }

      setWeather({
        ...data.current,
        forecast: data.forecast,
        fromSearch: weather?.fromSearch,
        lastCity: weather?.lastCity,
      });
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zaktualizować danych.');
    } finally {
      setRefreshing(false);
    }
  };

  if (!weather || !weather.forecast) {
    return (
      <View style={[globalStyles.centered, { backgroundColor: '#f0f8ff' }]}>
        <Text style={[globalStyles.message, { color: '#888' }]}>
          Brak danych pogodowych
        </Text>
      </View>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;

  return (
    <ScrollView
      contentContainerStyle={[globalStyles.detailsContainer, { backgroundColor: '#f0f8ff' }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={[globalStyles.city, { color: '#000' }]}>{weather.city}</Text>
      <Image source={{ uri: iconUrl }} style={globalStyles.icon} />
      <Text style={[globalStyles.temp, { color: '#ff8c00' }]}>
        {Math.round(weather.temperature)}°C
      </Text>
      <Text style={[globalStyles.description, { color: '#000' }]}>
        {weather.description}
      </Text>

      <Text style={[globalStyles.subtitle, { color: '#000' }]}>
        Prognoza godzinowa
      </Text>
      <ForecastList data={weather.forecast.slice(0, 8)} />

      <Text style={[globalStyles.subtitle, { color: '#000', marginTop: 30 }]}>
        Prognoza 5-dniowa
      </Text>
      <FiveDayForecastBlock forecast={weather.forecast} />
    </ScrollView>
  );
};

export default DetailsScreen;
