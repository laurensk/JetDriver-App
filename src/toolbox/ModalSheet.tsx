import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useColorScheme, Modal, StatusBar, Button} from 'react-native';
import {NavigationTheme} from './NavigationTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
              <TouchableOpacity
                onPress={() => {
                  props.headerOnClose();
                }}>
                <Button title={props.headerCloseText} onPress={() => {}}></Button>
              </TouchableOpacity>
            ),
          }}>
          {() => <props.component {...props.componentProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Modal>
  );
};
