import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { getWeather, getWeatherByCity } from '../services/weatherService';
import { useWeather } from '../contexts/WeatherContext';
import { addCityToHistory, getCityHistory } from '../services/historyService';
import { globalStyles } from '../style/styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { setWeather } = useWeather();

  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [inputFocused, setInputFocused] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const data = await getWeather();
      setWeather({
        ...data.current,
        forecast: data.forecast,
        fromSearch: false,
        lastCity: '',
      });
      navigation.navigate('Details');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось получить данные о погоде.');
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async () => {
    const city = cityName.trim();
    if (!city) return;

    try {
      setLoading(true);
      const data = await getWeatherByCity(city);
      setWeather({
        ...data.current,
        forecast: data.forecast,
        fromSearch: true,
        lastCity: city,
      });
      await addCityToHistory(city);
      const updated = await getCityHistory();
      setHistory(updated);
      navigation.navigate('Details');
    } catch (error) {
      Alert.alert('Ошибка', 'Город не найден.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFromHistory = async (city: string) => {
    try {
      setCityName(city);
      setInputFocused(false);
      setLoading(true);
      const data = await getWeatherByCity(city);
      setWeather({
        ...data.current,
        forecast: data.forecast,
        fromSearch: true,
        lastCity: city,
      });
      navigation.navigate('Details');
    } catch {
      Alert.alert('Ошибка', 'Не удалось загрузить город');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoading(true);
        const data = await getWeather();
        setWeather({
          ...data.current,
          forecast: data.forecast,
          fromSearch: false,
          lastCity: '',
        });

        const historyData = await getCityHistory();
        setHistory(historyData);

        navigation.navigate('Details');
      } catch (e) {
        console.log('Нет кешированных данных');
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, []);

  const filteredHistory = history.filter(city =>
    city.toLowerCase().startsWith(cityName.toLowerCase())
  );

  return (
    <View style={[globalStyles.container, { backgroundColor: '#fff' }]}>
      <Text style={[globalStyles.title, { color: '#000' }]}>🌤 Weather App</Text>

      <View style={{ width: '80%' }}>
        <TextInput
          style={[
            globalStyles.input,
            {
              backgroundColor: '#f0f0f0',
              color: '#000',
              borderColor: '#ccc',
            },
          ]}
          placeholder="Введите город"
          placeholderTextColor="#666"
          value={cityName}
          onChangeText={setCityName}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 200)}
        />

        {inputFocused && cityName.trim().length > 0 && filteredHistory.length > 0 && (
          <View style={[globalStyles.dropdown, { backgroundColor: '#fff' }]}>
            {filteredHistory.map((city, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelectFromHistory(city)}>
                <Text style={[globalStyles.historyItem, { color: '#000' }]}>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Button title="Найти" onPress={handleCitySearch} />
      <View style={{ height: 20 }} />
      <Button title="Обновить по геолокации" onPress={fetchWeather} />

      {loading && (
        <ActivityIndicator size="large" color="#007aff" style={{ marginTop: 20 }} />
      )}
    </View>
  );
};

export default HomeScreen;
