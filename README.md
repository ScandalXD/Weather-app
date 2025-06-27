# 🌤️ Weather App

Nowoczesna aplikacja pogodowa stworzona w **React Native**. Pozwala użytkownikom sprawdzić aktualną pogodę w swoim mieście za pomocą API OpenWeatherMap.

## 👤 Autor

**Artur Pylypenko**  
Numer indeksu: 44074

## 📲 Funkcjonalności

- 🌍 Pogoda dla **bieżącej lokalizacji**
- 🔎 **Wyszukiwanie** pogody dla dowolnego miasta
- 📅 **Prognoza na 5 dni**
- 🌙 Przełącznik **jasny/ciemny motyw**
- 🔄 **Odświeżanie przez przeciągnięcie**
- 🕘 **Historia wyszukiwań**

## 🛠️ Technologie

- React Native
- Expo
- TypeScript
- OpenWeatherMap API
- React Navigation
- Context API
- AsyncStorage

## 📦 Instalacja i uruchomienie

1. **Sklonuj repozytorium**
   ```bash
   git clone https://github.com/ScandalXD/Weather-app.git
   cd Weather-app
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Utwórz plik `.env`**
   W głównym folderze projektu utwórz plik `.env` z następującą zawartością:
   ```
   OPENWEATHER_API_KEY=twoj_klucz_api
   ```

4. **Uruchom aplikację**
   ```bash
   npx expo start
   ```

## 🔐 Wymagania

- Node.js
- Expo CLI
- Klucz API z OpenWeatherMap (https://openweathermap.org/api)
- Emulator Android/iOS lub urządzenie fizyczne z aplikacją Expo Go