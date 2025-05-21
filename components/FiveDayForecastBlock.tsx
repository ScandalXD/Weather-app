import React from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../style/styles';

interface ForecastEntry {
  dt_txt: string;
  temp: number;
  icon: string;
  description: string;
}

interface GroupedDay {
  date: string;
  min: number;
  max: number;
  icon: string;
  description: string;
}

interface Props {
  forecast: ForecastEntry[];
}

const fallbackIcon = 'https://openweathermap.org/img/wn/01d@2x.png';

const groupByDay = (forecast: ForecastEntry[]): GroupedDay[] => {
  const days: { [key: string]: ForecastEntry[] } = {};

  forecast.forEach((entry) => {
    const date = entry.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(entry);
  });

  return (Object.entries(days) as [string, ForecastEntry[]][]).map(([date, entries]) => {
    const temps = entries.map((e) => e.temp);
    const midday = entries.find((e) => e.dt_txt.includes('12:00')) || entries[0];

    return {
      date,
      min: Math.min(...temps),
      max: Math.max(...temps),
      icon: midday?.icon ?? '01d',
      description: midday?.description ?? 'brak danych',
    };
  });
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pl-PL', { weekday: 'short' });
};

const FiveDayForecastBlock: React.FC<Props> = ({ forecast }) => {
  if (!Array.isArray(forecast)) {
    return (
      <View>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Błąd: nieprawidłowe dane wejściowe
        </Text>
      </View>
    );
  }

  const grouped = groupByDay(forecast).slice(0, 5);

  return (
    <View style={{ width: '100%', marginTop: 30 }}>
      {grouped.map((item) => (
        <View key={item.date} style={globalStyles.dayRow}>
          <Text style={{ width: 70 }}>{formatDate(item.date)}</Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
            style={{ width: 40, height: 40 }}
            onError={(e) => {
              console.warn(`Nie udało się załadować ikony: ${item.icon}`);
              e.currentTarget.setNativeProps({
                src: [{ uri: fallbackIcon }],
              });
            }}
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
