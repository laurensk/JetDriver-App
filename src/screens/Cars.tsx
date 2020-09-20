import React from 'react';
import {View, Text, ColorSchemeName, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {}

export class Cars extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  static navigationButton = (route: any, navigation: any) => {
    let createCar: Function;
    if (route.params) {
      createCar = route.params.createCar;
    } else {
      createCar = () => {};
    }
    return (
      <TouchableOpacity onPress={() => createCar()}>
        <Icon name="add" size={30} color="#027BFF"></Icon>
      </TouchableOpacity>
    );
  };

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <Text>your cars</Text>
      </View>
    );
  }
}

export default AppContext(Cars);
