import React from 'react';
import {View, Text, StyleSheet, ColorSchemeName, Button} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';

interface PropsType {
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
  navigation: NavigationScreenProp<any, any>;
}

interface StateType {
  listOfNumbers: Number[];
}

class Home extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      listOfNumbers: [],
    };
  }

  componentDidMount() {
    // do data fetching
    this.setState({
      listOfNumbers: [1, 2, 3, 4],
    });
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <Text style={{color: colorScheme == 'dark' ? 'white' : 'black'}}>
          {colorScheme}
        </Text>
        <Text>{this.state.listOfNumbers.toString()}</Text>
        <Button title="add some values" onPress={this.onButtonPress}></Button>
      </View>
    );
  }

  onButtonPress = () => {
    this.setState((state) => ({
      listOfNumbers: this.state.listOfNumbers.concat([5, 6, 7, 8]),
    }));
  };
}

export default AppContext(Home);
