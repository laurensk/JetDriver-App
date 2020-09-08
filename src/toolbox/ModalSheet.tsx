import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useColorScheme, Modal, Button, View, StatusBar} from 'react-native';
import {NavigationTheme} from './NavigationTheme';

export const ModalSheet = (props: any) => {
  const modalComponent = () => {
    return (
      <View>
        <StatusBar barStyle="light-content"></StatusBar>
        <props.component></props.component>
      </View>
    );
  };
  const Stack = createNativeStackNavigator();

  const headerTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationHeaderTheme()
      : NavigationTheme.lightNavigationHeaderTheme();

  const headerTitleTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationTitleTheme()
      : NavigationTheme.lightNavigationTitleTheme();

  return (
    <Modal animationType="slide" visible={props.visible} presentationStyle={'pageSheet'}>
      <Stack.Navigator>
        <Stack.Screen
          name={props.headerTitle}
          component={modalComponent}
          options={{
            headerStyle: headerTheme,
            headerTitleStyle: headerTitleTheme,
            headerLeft: () => (
              <Button
                title={props.headerCloseText}
                onPress={() => {
                  props.headerOnClose();
                }}></Button>
            ),
          }}
        />
      </Stack.Navigator>
    </Modal>
  );
};
