import React from 'react';
import {View, Text, StatusBar, ColorSchemeName, Image} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';
import NavigationModal from '../toolbox/NavigationModal';
import SegmentedControl from '@react-native-community/segmented-control';
import {Input, Button, Icon} from 'react-native-elements';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {
  loginSegment: number;
}

class Login extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      loginSegment: 0,
    };
  }

  render() {
    const {navigation, theme, colorScheme} = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.backgroundColor,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', paddingBottom: 100}}>
          <Image
            source={require('../assets/jetdriver_logo.png')}
            resizeMode={'contain'}
            style={{width: 250, height: 150}}></Image>
        </View>
        <SegmentedControl
          style={{width: '80%', alignSelf: 'center'}}
          values={['Registrieren', 'Anmelden']}
          selectedIndex={this.state.loginSegment}
          onChange={(event) => {
            this.setState({
              loginSegment: event.nativeEvent.selectedSegmentIndex,
            });
          }}></SegmentedControl>
        <View
          style={{
            width: '80%',
            alignSelf: 'center',
            paddingTop: 50,
            height: 240,
          }}>
          {this.state.loginSegment == 0 && (
            <Input placeholder="Name" onChangeText={(value) => {}} />
          )}
          <Input
            keyboardType={'email-address'}
            placeholder="E-Mail"
            onChangeText={(value) => {}}
          />
          <Input
            secureTextEntry={true}
            placeholder="Passwort"
            onChangeText={(value) => {}}
          />
        </View>
        <View style={{paddingTop: 30}}>
          <Button
            onPress={() => {}}
            style={{width: '80%', alignSelf: 'center'}}
            title={
              this.state.loginSegment == 0 ? 'Konto erstellen' : 'Anmelden'
            }
          />
        </View>
      </View>
    );
  }
}

export default AppContext(
  NavigationModal(Login, {
    title: 'Willkommen bei JetDriver',
    largeTitle: false,
    gestureEnabled: false,
  }),
);
