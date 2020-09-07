import React from 'react';
import {View, Text, StatusBar, Button, ColorSchemeName} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';
import NavigationModal from '../toolbox/NavigationModal';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {}

class Login extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation, theme, colorScheme} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <Button
          title="Einloggen"
          onPress={() => {
            // set user here
          }}></Button>
      </View>
    );
  }
}

export default AppContext(
  NavigationModal(Login, {
    title: 'Willkommen bei JetDriver',
    largeTitle: false,
    gestureEnabled: false,
  }),
);
