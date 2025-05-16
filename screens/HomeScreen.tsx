import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
      setCityName('');
      navigation.navigate('Details');
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać danych pogodowych.');
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
      setCityName('');
      navigation.navigate('Details');
    } catch (error) {
      Alert.alert('Błąd', 'Nie znaleziono miasta.');
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
      setCityName('');
      navigation.navigate('Details');
    } catch {
      Alert.alert('Błąd', 'Nie udało się załadować miasta.');
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
        console.log('Brak danych w pamięci podręcznej');
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
    <ScrollView contentContainerStyle={globalStyles.container} keyboardShouldPersistTaps="handled">
      <Text style={globalStyles.title}>🌤 WeatherGuide</Text>

      <View style={{ width: '100%', maxWidth: 400 }}>
        <TextInput
          style={globalStyles.input}
          placeholder="Wpisz nazwę miasta"
          placeholderTextColor="#666"
          value={cityName}
          onChangeText={setCityName}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 200)}
        />

        {inputFocused && cityName.trim().length > 0 && filteredHistory.length > 0 && (
          <View style={globalStyles.dropdown}>
            {filteredHistory.map((city, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelectFromHistory(city)}>
                <Text style={globalStyles.historyItem}>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity style={globalStyles.button} onPress={handleCitySearch}>
        <Text style={globalStyles.buttonText}>🔍 Szukaj</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={fetchWeather}>
        <Text style={globalStyles.buttonText}>📍 Pogoda po lokalizacji</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Map')}>
        <Text style={globalStyles.buttonText}>🗺 Mapa opadów</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007aff" style={{ marginTop: 20 }} />}
    </ScrollView>
  );
};

export default HomeScreen;
