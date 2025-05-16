import React from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../style/styles';

interface ForecastEntry {
  dt_txt: string;
  temp: number;
  icon: string;
  description: string;
}

interface Props {
  forecast: ForecastEntry[];
}

const groupByDay = (forecast: ForecastEntry[]) => {
  const days: { [key: string]: ForecastEntry[] } = {};
  forecast.forEach(entry => {
    const date = entry.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(entry);
  });

  return Object.entries(days).map(([date, entries]) => {
    const temps = entries.map(e => e.temp);
    const midday = entries.find(e => e.dt_txt.includes('12:00')) || entries[0];
    return {
      date,
      min: Math.min(...temps),
      max: Math.max(...temps),
      icon: midday.icon,
      description: midday.description,
    };
  });
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pl-PL', { weekday: 'short' });
};

const FiveDayForecastBlock: React.FC<Props> = ({ forecast }) => {
  const grouped = groupByDay(forecast).slice(0, 5);

  return (
    <View style={{ width: '100%', marginTop: 30 }}>
      {grouped.map(item => (
        <View key={item.date} style={globalStyles.dayRow}>
          <Text style={{ width: 70 }}>{formatDate(item.date)}</Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ width: 80, textAlign: 'center' }}>
            {Math.round(item.min)}° / {Math.round(item.max)}°
          </Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
};

export default FiveDayForecastBlock;
