import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWeather } from '../contexts/WeatherContext';

const DetailsScreen = () => {
  const { weather } = useWeather();

  if (!weather) return <Text style={styles.message}>No weather data</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.city}</Text>
      <Text style={styles.temp}>{weather.temperature}°C</Text>
      <Text>{weather.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  city: { fontSize: 28, fontWeight: 'bold' },
  temp: { fontSize: 48 },
  message: { marginTop: 20, fontSize: 18, textAlign: 'center' },
});

export default DetailsScreen;
