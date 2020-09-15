import React from 'react';
import {View, Text, ColorSchemeName, Button} from 'react-native';
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

  static navigationButton = (
    <Button
      onPress={() => {
        console.log('error');
      }}
      title="+"
    />
  );

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
