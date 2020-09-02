import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useColorScheme, Modal, Button} from 'react-native';
import {NavigationTheme} from './NavigationTheme';

export const ModalSheet = (props: any) => {
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
    <Modal
      animationType="slide"
      visible={props.visible}
      presentationStyle={'pageSheet'}>
      <Stack.Navigator>
        <Stack.Screen
          name={props.headerTitle}
          component={props.component}
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
