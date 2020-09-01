import React from 'react';
import {View, ColorSchemeName, Image, Text, Alert} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';
import {Button, Icon} from 'react-native-elements';
import {AccountUtils} from '../utils/AccountUtils';
import {Account} from '../models/Account';
import {QuickDriveUtils} from '../utils/QuickDriveUtils';
import AsyncStorage from '@react-native-community/async-storage';

interface PropsType {
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
  navigation: NavigationScreenProp<any, any>;
}

interface StateType {
  account: Account;
  quickDriveStatus: boolean;
}

class Home extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      account: new Account('', '', '', ''),
      quickDriveStatus: false,
    };
  }

  async componentDidMount() {
    await AccountUtils.setUser(
      '1bdeff56-6ffb-44eb-b995-67727d9ae9cb',
      'lk@laurensk.at',
      'Laurens Kropf',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMWJkZWZmNTYtNmZmYi00NGViLWI5OTUtNjc3MjdkOWFlOWNiIiwiaWF0IjoxNTk4ODE0ODU5fQ.SawJ_uBOqKJyHz2cmEEjC-rDtzDJy2ZqX6YZ46Wko0c',
    );
    const account = await AccountUtils.getUser();
    if (account != null) {
      this.setState({
        account: account,
      });
    }
    this.checkQuickDriveStatus();
    // const {navigation} = this.props;
    // if (!(await AccountUtils.isLoggedIn())) {
    //   navigation.navigate('Login');
    // }
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/jetdriver_logo.png')}
          resizeMode={'contain'}
          style={{width: 250, height: 150}}></Image>
        <View style={{paddingTop: 100}}></View>
        <View>
          {}
          <Text
            style={{
              fontSize: 20,
              color: '#2089DC',
              fontFamily: 'Arial Rounded MT Bold',
            }}>
            Gute Fahrt, {this.state.account.name || 'Nutzer'}
          </Text>
        </View>
        <View style={{paddingTop: 25}}></View>
        <View style={{flexDirection: 'row'}}>
          <Button
            style={{paddingHorizontal: 3}}
            buttonStyle={{width: 190, height: 50}}
            icon={
              <Icon
                style={{paddingRight: 10}}
                name="database-plus"
                type="material-community"
                size={25}
                color="white"
              />
            }
            title="Eintragen"
          />
          <Button
            onPress={() => this.toggleQuickDrive()}
            style={{paddingHorizontal: 3}}
            buttonStyle={{width: 190, height: 50}}
            icon={
              <Icon
                style={{paddingRight: 10}}
                name="car"
                type="material-community"
                size={25}
                color="white"
              />
            }
            title={
              this.state.quickDriveStatus ? 'Fahrt beenden' : 'Fahrt starten'
            }
          />
        </View>
        <Button
          type="outline"
          style={{paddingTop: 10, paddingHorizontal: 3}}
          buttonStyle={{width: 386, height: 50}}
          icon={
            <Icon
              style={{paddingRight: 10}}
              name="format-list-bulleted"
              type="material-community"
              size={25}
              color="#2089DC"
            />
          }
          title="Fahrtenprotoll anzeigen"
        />
        <View style={{flexDirection: 'row', paddingTop: 10}}>
          <Button
            type="outline"
            style={{paddingHorizontal: 3}}
            buttonStyle={{width: 190, height: 50}}
            icon={
              <Icon
                style={{paddingRight: 10}}
                name="car"
                type="material-community"
                size={25}
                color="#2089DC"
              />
            }
            title="Autos"
          />
          <Button
            type="outline"
            style={{paddingHorizontal: 3}}
            buttonStyle={{width: 190, height: 50}}
            icon={
              <Icon
                style={{paddingRight: 10}}
                name="account-group"
                type="material-community"
                size={25}
                color="#2089DC"
              />
            }
            title="Begleiter"
          />
        </View>
        <View style={{paddingTop: 100}}></View>
        <View style={{flexDirection: 'row'}}>
          <Button title="Über JetDriver" type="clear" />
          <Button title="Kontakt" type="clear" />
        </View>
        <Button
          title="Abmelden"
          type="clear"
          titleStyle={{fontWeight: '600'}}
        />
      </View>
    );
  }

  async checkQuickDriveStatus() {
    this.setState({
      quickDriveStatus: await QuickDriveUtils.checkForQuickDrive(),
    });
  }

  async toggleQuickDrive() {
    if (await QuickDriveUtils.checkForQuickDrive()) {
      this.checkQuickDriveStatus();
      await QuickDriveUtils.stopQuickDrive(
        async (
          startDate: Date,
          endDate: Date,
          startMileage: number,
          endMileage: number,
        ) => {
          this.checkQuickDriveStatus();
          this.props.navigation.navigate('CreateEntry');
        },
      );
    } else {
      await QuickDriveUtils.startQuickDrive(() => {
        console.log('enabled');
        this.checkQuickDriveStatus();
      });
    }
  }
}

export default AppContext(Home);
