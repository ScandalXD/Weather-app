import React, { useCallback } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { globalStyles } from '../style/styles';

interface ForecastItem {
  dt_txt: string;
  temp: number;
  icon: string;
  description: string;
}

const fallbackIcon = 'https://openweathermap.org/img/wn/01d@2x.png';

const ForecastList = ({ data }: { data: ForecastItem[] }) => {
  if (!Array.isArray(data)) {
    return (
      <View style={globalStyles.card}>
        <Text style={globalStyles.desc}>Błąd: nieprawidłowe dane prognozy</Text>
      </View>
    );
  }

  const renderItem = useCallback(({ item }: { item: ForecastItem }) => {
    return (
      <View style={globalStyles.card}>
        <Text style={globalStyles.time}>
          {new Date(item.dt_txt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
          style={globalStyles.iconSmall}
          onError={(e) => {
            console.warn(`Nie udało się załadować ikony: ${item.icon}`);
            e.currentTarget.setNativeProps({
              src: [{ uri: fallbackIcon }],
            });
          }}
        />
        <Text style={globalStyles.tempSmall}>{Math.round(item.temp)}°C</Text>
        <Text style={globalStyles.desc}>{item.description}</Text>
      </View>
    );
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.dt_txt}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default ForecastList;
