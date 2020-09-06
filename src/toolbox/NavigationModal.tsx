import React from 'react';
import {View, Text, ColorSchemeName} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationTheme} from './NavigationTheme';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  colorScheme: ColorSchemeName;
  component: any;
  title: string;
  largeTitle: boolean;
  gestureEnabled: boolean;
}

class NavigationModal extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    const {
      navigation,
      component,
      title,
      largeTitle,
      gestureEnabled,
      colorScheme,
    } = this.props;

    const NavigationStack = createNativeStackNavigator();
    function ModalNavigationStack() {
      const headerTheme =
        colorScheme === 'dark'
          ? NavigationTheme.darkNavigationHeaderTheme()
          : NavigationTheme.lightNavigationHeaderTheme();

      const headerTitleTheme =
        colorScheme === 'dark'
          ? NavigationTheme.darkNavigationTitleTheme()
          : NavigationTheme.lightNavigationTitleTheme();

      return (
        <NavigationStack.Navigator
          screenOptions={{
            stackPresentation: 'push',
          }}>
          <NavigationStack.Screen
            name="Main"
            component={component}
            options={{
              gestureEnabled: gestureEnabled,
              headerTitle: title,
              headerLargeTitle: largeTitle,
              headerStyle: headerTheme,
              headerTitleStyle: headerTitleTheme,
            }}
          />
        </NavigationStack.Navigator>
      );
    }

    return (
      <NavigationContainer>
        <ModalNavigationStack></ModalNavigationStack>
      </NavigationContainer>
    );
  }
}

export default NavigationModal;
