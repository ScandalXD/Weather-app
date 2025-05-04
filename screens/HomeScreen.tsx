import React from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { getWeather } from '../services/weatherService';
import { useWeather } from '../contexts/WeatherContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { setWeather } = useWeather();
  const [loading, setLoading] = React.useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const data = await getWeather();
      setWeather(data);
      navigation.navigate('Details');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось получить данные о погоде.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Check Weather" onPress={fetchWeather} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default HomeScreen;
