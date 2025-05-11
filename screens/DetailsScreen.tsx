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
import { getWeather } from '../services/weatherService';
import { globalStyles } from '../style/styles';

const DetailsScreen = () => {
  const { weather, setWeather } = useWeather();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await getWeather();
      setWeather({ ...data.current, forecast: data.forecast });
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось обновить данные.');
    } finally {
      setRefreshing(false);
    }
  };

  if (!weather) {
    return (
      <View style={[globalStyles.centered, { backgroundColor: '#f0f8ff' }]}>
        <Text style={[globalStyles.message, { color: '#888' }]}>
          Нет данных о погоде
        </Text>
      </View>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;

  return (
    <ScrollView
      contentContainerStyle={[globalStyles.detailsContainer, { backgroundColor: '#f0f8ff' }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#000"
        />
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

      {weather.forecast && weather.forecast.length > 0 && (
        <>
          <Text style={[globalStyles.subtitle, { color: '#000' }]}>
            Прогноз
          </Text>
          <ForecastList data={weather.forecast.slice(0, 8)} />
        </>
      )}
    </ScrollView>
  );
};

export default DetailsScreen;
