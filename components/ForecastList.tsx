import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { globalStyles } from '../style/styles';

interface ForecastItem {
  dt_txt: string;
  temp: number;
  icon: string;
  description: string;
}

const ForecastList = ({ data }: { data: ForecastItem[] }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
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
          />
          <Text style={globalStyles.tempSmall}>{Math.round(item.temp)}°C</Text>
          <Text style={globalStyles.desc}>{item.description}</Text>
        </View>
      )}
    />
  );
};

export default ForecastList;
