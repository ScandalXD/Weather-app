import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { getWeather } from '../services/weatherService';

const RainMapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [icon, setIcon] = useState<string>('');
  const [timeKey, setTimeKey] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);

        const weather = await getWeather();
        setTemperature(Math.round(weather.current.temperature));
        setIcon(weather.current.icon);

        const now = new Date();
        const rounded = Math.floor(now.getTime() / 600000) * 600; 
        setTimeKey(rounded.toString());
      } catch (err) {
        console.log('Błąd:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (!location || loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
    >
      <Marker
        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
        title="Temperatura"
        description={`${temperature}°C`}
      >
        <View style={styles.marker}>
          <Text style={styles.markerText}>{temperature}°</Text>
        </View>
      </Marker>

      {timeKey && (
        <UrlTile
          urlTemplate={`https://tilecache.rainviewer.com/v2/radar/${timeKey}/256/{z}/{x}/{y}/2/1_1.png`}
          zIndex={1}
          maximumZ={10}
          flipY={false}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 6,
    borderColor: '#333',
    borderWidth: 1,
  },
  markerText: {
    fontWeight: 'bold',
  },
});

export default RainMapScreen;