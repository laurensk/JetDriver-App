import React from 'react';
import {useColorScheme, LogBox, YellowBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import CreateEntry from './screens/CreateEntry';
import {NavigationTheme} from './toolbox/NavigationTheme';
import SplashScreen from 'react-native-splash-screen';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {OrientationLocker} from './toolbox/OrientationLocker';
import * as Entries from './screens/Entries';
import * as Companions from './screens/Companions';
import * as Cars from './screens/Cars';
import About from './screens/About';

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
        name="Entries"
        component={Entries.default}
        options={({route, navigation}) => ({
          headerTitle: 'Fahrtenprotokoll',
          headerStyle: headerTheme,
          headerTitleStyle: headerTitleTheme,
          headerRight: () => Entries.Entries.navigationButton(route, navigation),
        })}
      />
      <NavigationStack.Screen
        name="Cars"
        component={Cars.default}
        options={({route, navigation}) => ({
          headerTitle: 'Autos',
          headerStyle: headerTheme,
          headerTitleStyle: headerTitleTheme,
          headerRight: () => Cars.Cars.navigationButton(route, navigation),
        })}
      />
      <NavigationStack.Screen
        name="Companions"
        component={Companions.default}
        options={({route, navigation}) => ({
          headerTitle: 'Begleiter',
          headerStyle: headerTheme,
          headerTitleStyle: headerTitleTheme,
          headerRight: () => Companions.Companions.navigationButton(route, navigation),
        })}
      />
      <NavigationStack.Screen
        name="About"
        component={About}
        options={{
          headerTitle: 'Über JetDriver',
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
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  OrientationLocker.lock();
  SplashScreen.hide();
  enableScreens();
  return (
    <NavigationContainer>
      <JetDriverNavigationStack></JetDriverNavigationStack>
    </NavigationContainer>
  );
};
