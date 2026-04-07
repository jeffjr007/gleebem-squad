// App.tsx — Ponto de entrada principal com React Navigation
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import IntroScreen from './src/screens/IntroScreen';
import ConsentScreen from './src/screens/ConsentScreen';
import PreparationScreen from './src/screens/PreparationScreen';
import ScanScreen from './src/screens/ScanScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import ResultScreen from './src/screens/ResultScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';

export type RootStackParamList = {
  Home: undefined;
  Intro: undefined;
  Consent: undefined;
  Preparation: undefined;
  Scan: undefined;
  Loading: undefined;
  Result: undefined;
  Recommendations: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" hidden />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F0F0F0' },
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              opacity: current.progress,
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width * 0.24, 0],
                  }),
                },
              ],
            },
          }),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Consent" component={ConsentScreen} />
        <Stack.Screen name="Preparation" component={PreparationScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
