import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import CreateEntry from './screens/CreateEntry';
import Theme from './theme';

const ModalStack = createStackNavigator();
function JetDriverModalStack() {
  return (
    <ModalStack.Navigator mode="modal">
      <ModalStack.Screen
        name="Main"
        component={Home}
        options={{headerTitle: 'JetDriver'}}
      />
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
  return (
    <NavigationStack.Navigator>
      <NavigationStack.Screen
        name="ModalStack"
        component={JetDriverModalStack}
      />
      <NavigationStack.Screen
        name="CreateEntry"
        component={CreateEntry}
        options={{headerTitle: 'Fahrt eintragen'}}
      />
    </NavigationStack.Navigator>
  );
}

export default () => (
  <NavigationContainer theme={Theme}>
    <JetDriverNavigationStack></JetDriverNavigationStack>
  </NavigationContainer>
);
