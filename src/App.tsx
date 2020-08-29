import React from 'react';
import {useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import CreateEntry from './screens/CreateEntry';
import {NavigationTheme} from './toolbox/NavigationTheme';

const ModalStack = createStackNavigator();
function JetDriverModalStack() {
  return (
    <ModalStack.Navigator>
      <ModalStack.Screen name="Main" component={Home} />
      <ModalStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
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
    </NavigationStack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <JetDriverNavigationStack></JetDriverNavigationStack>
    </NavigationContainer>
  );
};
