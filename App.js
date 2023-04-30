import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


LogBox.ignoreAllLogs();

import AuthProvider from './src/contexts/auth';
import Routes from './src/routes';


export default function App() {
  return (
    <NavigationContainer>

      <AuthProvider>

        <StatusBar backgroundColor="#131313" barStyle="light-content" />

        <Routes />

      </AuthProvider>

    </NavigationContainer>
  );
}



