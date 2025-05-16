import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { WeatherProvider } from './contexts/WeatherContext';
import RainMapScreen from './screens/RainMapScreen'

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Map: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    
      <WeatherProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Map" component={RainMapScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </WeatherProvider>
    
  );
}

