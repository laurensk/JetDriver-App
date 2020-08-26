import React from 'react';
import {useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import CreateEntry from './screens/CreateEntry';
import {
  darkNavigationHeaderStyle,
  lightNavigationHeaderStyle,
  darkNavigationTitleStyle,
} from './toolbox/NativeNavigationStyle';

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
  const headerStyle =
    useColorScheme() === 'dark'
      ? darkNavigationHeaderStyle
      : lightNavigationHeaderStyle;

  const headerTitleStyle =
    useColorScheme() === 'dark'
      ? darkNavigationTitleStyle
      : lightNavigationHeaderStyle;

  return (
    <NavigationStack.Navigator>
      <NavigationStack.Screen
        name="ModalStack"
        component={JetDriverModalStack}
        options={{
          headerTitle: 'JetDriver',
          headerStyle: headerStyle(),
          headerTitleStyle: headerTitleStyle(),
        }}
      />
      <NavigationStack.Screen
        name="CreateEntry"
        component={CreateEntry}
        options={{
          headerTitle: 'Fahrt eintragen',
          headerStyle: headerStyle(),
          headerTitleStyle: headerTitleStyle(),
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
