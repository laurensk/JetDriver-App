import React from 'react';
import {View, Text} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
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
      </View>
    );
  }
}

export default AppContext(Login);
