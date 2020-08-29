import React from 'react';
import {useColorScheme} from 'react-native';

const DefaultTheme: {[k: string]: string} = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
};

const DarkTheme: {[k: string]: string} = {
  backgroundColor: '#000000',
  textColor: '#ffffff',
};

export const DefaultThemeContext = React.createContext(DefaultTheme);
export const DarkThemeContext = React.createContext(DarkTheme);
