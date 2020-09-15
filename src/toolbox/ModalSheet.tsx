import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useColorScheme, Modal, Button, StatusBar} from 'react-native';
import {NavigationTheme} from './NavigationTheme';

interface PropsType {
  component: any;
  componentProps: any;
  headerTitle: string;
  headerCloseText: string;
  headerOnClose: Function;
  visible: boolean;
}

export const ModalSheet = (props: PropsType) => {
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
      <StatusBar barStyle="light-content"></StatusBar>
      <Stack.Navigator>
        <Stack.Screen
          name={props.headerTitle}
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
          }}>
          {() => <props.component {...props.componentProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Modal>
  );
};
