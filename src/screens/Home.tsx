import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
}

interface StateType {}

class Home extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text>Home</Text>
      </View>
    );
  }
}

export default Home;
