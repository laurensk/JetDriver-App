import React from 'react';
import {View, Text, StatusBar, Button} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';
import NavigationModal from '../toolbox/NavigationModal';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
}

interface StateType {}

class Login extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text>Login to JetDriver</Text>
        <Text>We never sell your data</Text>
        <Button
          title="goback"
          onPress={() => {
            this.props.navigation.goBack();
          }}></Button>
      </View>
    );
  }
}

export default AppContext(
  NavigationModal(Login, {
    title: 'Willkommen',
    largeTitle: false,
    gestureEnabled: false,
  }),
);
