import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import CreateEntry from './screens/CreateEntry';
import {NavigationTheme} from './toolbox/NavigationTheme';
import SplashScreen from 'react-native-splash-screen';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {OrientationLocker} from './toolbox/OrientationLocker';

const NavigationStack = createNativeStackNavigator();
function JetDriverNavigationStack() {
  const headerTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationHeaderTheme()
      : NavigationTheme.lightNavigationHeaderTheme();

  const headerTitleTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationTitleTheme()
      : NavigationTheme.lightNavigationTitleTheme();

  return (
    <NavigationStack.Navigator
      screenOptions={{
        stackPresentation: 'push',
      }}>
      <NavigationStack.Screen
        name="Main"
        component={Home}
        options={{
          headerTitle: 'JetDriver',
          headerStyle: headerTheme,
          headerTitleStyle: headerTitleTheme,
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
      <NavigationStack.Screen
        name="Login"
        component={Login}
        options={{
          gestureEnabled: false,
          title: 'Welcome to JetDriver',
          headerStyle: headerTheme,
          headerTitleStyle: headerTitleTheme,
          stackPresentation: 'modal',
        }}
      />
    </NavigationStack.Navigator>
  );
}

export default () => {
  OrientationLocker.lock();
  SplashScreen.hide();
  enableScreens();
  return (
    <NavigationContainer>
      <JetDriverNavigationStack></JetDriverNavigationStack>
    </NavigationContainer>
  );
};
