import React from 'react';
import {View, Text} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
}

interface StateType {}

class CreateCar extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;

    return (
      <View>
        <Text>CreateCar</Text>
      </View>
    );
  }
}

export default CreateCar;
