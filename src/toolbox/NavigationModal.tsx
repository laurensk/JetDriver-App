import React from 'react';
import {useColorScheme, StatusBar} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationTheme} from './NavigationTheme';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';

interface NavigationSettings {
  title: string;
  largeTitle: boolean;
  gestureEnabled: boolean;
}

export default (Component: any, navigationSettings: NavigationSettings) => {
  return (props: any) => {
    const NavigationStack = createNativeStackNavigator();
    function ModalNavigationStack() {
      const colorScheme = useColorScheme();
      const headerTheme =
        colorScheme === 'dark'
          ? NavigationTheme.darkNavigationHeaderTheme()
          : NavigationTheme.lightNavigationHeaderTheme();
      const headerTitleTheme =
        colorScheme === 'dark'
          ? NavigationTheme.darkNavigationTitleTheme()
          : NavigationTheme.lightNavigationTitleTheme();

      return (
        <NavigationStack.Navigator
          screenOptions={{
            stackPresentation: 'push',
          }}>
          <NavigationStack.Screen
            name="Main"
            options={{
              gestureEnabled: navigationSettings.gestureEnabled,
              headerTitle: navigationSettings.title,
              headerLargeTitle: navigationSettings.largeTitle,
              headerStyle: headerTheme,
              headerTitleStyle: headerTitleTheme,
            }}>
            {() => <Component {...props}></Component>}
          </NavigationStack.Screen>
        </NavigationStack.Navigator>
      );
    }

    return (
      <NavigationContainer independent={true}>
        <StatusBar barStyle="light-content"></StatusBar>
        <ModalNavigationStack></ModalNavigationStack>
      </NavigationContainer>
    );
  };
};
