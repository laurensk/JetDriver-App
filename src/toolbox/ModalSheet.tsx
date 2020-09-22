import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useColorScheme, Modal, StatusBar, Button, Platform, ColorSchemeName} from 'react-native';
import {NavigationTheme} from './NavigationTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import AppContext from '../utils/AppContext';

interface PropsType {
  colorScheme: ColorSchemeName;
  component: any;
  componentProps: any;
  headerTitle: string;
  headerCloseText: string;
  headerOnClose: Function;
  visible: boolean;
}

const ModalSheetComponent = (props: PropsType) => {
  const NativeStack = createNativeStackNavigator();
  const Stack = createStackNavigator();

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
      {Platform.OS == 'ios' && (
        <NativeStack.Navigator>
          <NativeStack.Screen
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
          </NativeStack.Screen>
        </NativeStack.Navigator>
      )}
      {Platform.OS != 'ios' && (
        <Stack.Navigator mode="modal">
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
                  <Icon
                    color={props.colorScheme == 'dark' ? 'white' : undefined}
                    style={{paddingLeft: 20}}
                    name="close"
                    type="material-community"
                    size={25}
                  />
                </TouchableOpacity>
              ),
            }}>
            {() => <props.component {...props.componentProps} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </Modal>
  );
};

export const ModalSheet = AppContext(ModalSheetComponent);
