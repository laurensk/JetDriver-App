import React from 'react';
import {View, Text} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

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
      <View>
        <Text>Login</Text>
      </View>
    );
  }
}

export default Login;
