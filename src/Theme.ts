import React from 'react';
import {useColorScheme} from 'react-native';

const DefaultTheme: {[k: string]: string} = {
  backgroundColor: '#ffffff',
};

const DarkTheme: {[k: string]: string} = {
  backgroundColor: '#000000',
};

// export const Theme = () => {
//   const scheme = useColorScheme();
//   return scheme == 'dark' ? DarkTheme : DefaultTheme;
// };

export const DefaultThemeContext = React.createContext(DefaultTheme);
export const DarkThemeContext = React.createContext(DarkTheme);
