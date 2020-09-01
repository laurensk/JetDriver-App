import React from 'react';
import {useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import CreateEntry from './screens/CreateEntry';
import {NavigationTheme} from './toolbox/NavigationTheme';
import SplashScreen from 'react-native-splash-screen';

const ModalStack = createStackNavigator();
function JetDriverModalStack() {
  const headerTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationHeaderTheme()
      : NavigationTheme.lightNavigationHeaderTheme();

  const headerTitleTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationTitleTheme()
      : NavigationTheme.lightNavigationHeaderTheme();

  return (
    <ModalStack.Navigator mode="modal">
      <ModalStack.Screen
        name="Main"
        component={Home}
        options={{
          headerTitle: 'JetDriver',
          headerStyle: headerTheme,
          headerTitleStyle: headerTitleTheme,
        }}
      />
      <ModalStack.Screen
        name="Login"
        component={Login}
        options={{
          headerLeft: () => null,
          gestureEnabled: false,
          headerTitle: 'Welcome to JetDriver',
          headerStyle: headerTheme,
          headerTitleStyle: headerTitleTheme,
        }}
      />
    </ModalStack.Navigator>
  );
}

const NavigationStack = createStackNavigator();
function JetDriverNavigationStack() {
  const headerTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationHeaderTheme()
      : NavigationTheme.lightNavigationHeaderTheme();

  const headerTitleTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationTitleTheme()
      : NavigationTheme.lightNavigationHeaderTheme();

  return (
    <NavigationStack.Navigator>
      <NavigationStack.Screen
        name="ModalStack"
        component={JetDriverModalStack}
        options={{
          headerShown: false,
        }}
      />
      <NavigationStack.Screen
        name="CreateEntry"
        component={CreateEntry}
        options={{
          headerTitle: 'Fahrt eintragen',
          headerStyle: headerTheme,
          headerTitleStyle: headerTitleTheme,
        }}
      />
    </NavigationStack.Navigator>
  );
}

export default () => {
  SplashScreen.hide();
  return (
    <NavigationContainer>
      <JetDriverNavigationStack></JetDriverNavigationStack>
    </NavigationContainer>
  );
};
