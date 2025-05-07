import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'CITY_HISTORY';
const MAX_HISTORY = 5;

export const addCityToHistory = async (city: string) => {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    let history = raw ? JSON.parse(raw) : [];

    history = history.filter((item: string) => item.toLowerCase() !== city.toLowerCase());

    history.unshift(city);

    if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.log('Ошибка сохранения истории:', e);
  }
};

export const getCityHistory = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.log('Ошибка чтения истории:', e);
    return [];
  }
};
