import React, { useEffect, useState } from 'react';
import {View, Text, Button, ActivityIndicator, Alert, TextInput,TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { getWeather, getWeatherByCity } from '../services/weatherService';
import { useWeather } from '../contexts/WeatherContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { addCityToHistory, getCityHistory } from '../services/historyService';
import { globalStyles } from '../style/styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { setWeather, weather } = useWeather();
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === 'dark';

  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [inputFocused, setInputFocused] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const data = await getWeather();
      setWeather({ ...data.current, forecast: data.forecast });
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
      setWeather({ ...data.current, forecast: data.forecast });
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
      setWeather({ ...data.current, forecast: data.forecast });
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
        setWeather({ ...data.current, forecast: data.forecast });

        const historyData = await getCityHistory();
        setHistory(historyData);
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
    <View style={[globalStyles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <Text style={[globalStyles.title, { color: isDark ? '#fff' : '#000' }]}>
        🌤 Weather App
      </Text>

      <View style={{ width: '80%' }}>
        <TextInput
          style={[
            globalStyles.input,
            {
              backgroundColor: isDark ? '#333' : '#f0f0f0',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#555' : '#ccc',
            },
          ]}
          placeholder="Введите город"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          value={cityName}
          onChangeText={setCityName}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 200)}
        />

          {inputFocused && cityName.trim().length > 0 && filteredHistory.length > 0 && (
          <View style={[globalStyles.dropdown, { backgroundColor: isDark ? '#222' : '#fff' }]}>
            {filteredHistory.map((city, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelectFromHistory(city)}>
                <Text style={[globalStyles.historyItem, { color: isDark ? '#fff' : '#000' }]}>
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Button title="Найти" onPress={handleCitySearch} />

      <View style={{ height: 20 }} />
      <Button title="Обновить по геолокации" onPress={fetchWeather} />
      <View style={{ height: 20 }} />
      <Button title={`Тема: ${isDark ? 'Тёмная 🌙' : 'Светлая ☀️'}`} onPress={toggleTheme} />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={isDark ? '#fff' : '#007aff'}
          style={{ marginTop: 20 }}
        />
      ) : (
        weather && (
          <View style={globalStyles.info}>
            <Text style={[globalStyles.label, { color: isDark ? '#fff' : '#000' }]}>
              Город: {weather.city}
            </Text>
            <Text style={[globalStyles.label, { color: isDark ? '#fff' : '#000' }]}>
              Температура: {Math.round(weather.temperature)}°C
            </Text>
            <Text style={[globalStyles.label, { color: isDark ? '#fff' : '#000' }]}>
              Описание: {weather.description}
            </Text>
          </View>
        )
      )}
    </View>
  );
};

export default HomeScreen;
