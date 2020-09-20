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

export class Entries extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.createEntry = this.createEntry.bind(this);
    this.state = {};
  }

  static navigationButton = (route: any, navigation: any) => {
    let createEntry: Function;
    if (route.params) {
      createEntry = route.params.createEntry;
    } else {
      createEntry = () => {};
    }
    return (
      <TouchableOpacity onPress={() => createEntry()}>
        <Icon name="add" size={30} color="#027BFF"></Icon>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this.props.navigation.setParams({
      createEntry: this.createEntry,
    });
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <Text>your entries</Text>
      </View>
    );
  }

  createEntry() {
    this.props.navigation.navigate('CreateEntry');
  }
}

export default AppContext(Entries);
