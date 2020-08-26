import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../AppContext';

interface PropsType {
  theme: {[k: string]: string};
  navigation: NavigationScreenProp<any, any>;
}

interface StateType {}

class Home extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {theme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <Text>Home</Text>
      </View>
    );
  }
}

export default AppContext(Home);
