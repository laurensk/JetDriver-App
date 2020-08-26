import React from 'react';
import {DefaultThemeContext, DarkThemeContext} from './Theme';
import {useColorScheme} from 'react-native';

export default (Component: any) => {
  return (props: any) => {
    const colorScheme = useColorScheme();
    return colorScheme == 'dark' ? (
      <DarkThemeContext.Consumer>
        {(theme) => (
          <Component {...props} theme={theme} colorScheme={colorScheme} />
        )}
      </DarkThemeContext.Consumer>
    ) : (
      <DefaultThemeContext.Consumer>
        {(theme) => (
          <Component {...props} theme={theme} colorScheme={colorScheme} />
        )}
      </DefaultThemeContext.Consumer>
    );
  };
};
