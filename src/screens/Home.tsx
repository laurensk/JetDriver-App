import React from 'react';
import {View, ColorSchemeName, Image, Text, Alert} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';
import {Button, Icon} from 'react-native-elements';
import {AccountUtils} from '../utils/AccountUtils';
import {Account} from '../models/Account';
import {QuickDriveUtils} from '../utils/QuickDriveUtils';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
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
    const event = this.props.navigation.addListener('focus', () => {
      this.checkLoginState();
    });

    await this.checkLoginState();
    this.checkQuickDriveStatus();
  }

  async checkLoginState() {
    const {navigation} = this.props;
    if (!(await AccountUtils.isLoggedIn())) {
      navigation.navigate('Login');
    } else {
      this.getAccount();
    }
  }

  async getAccount() {
    this.setState({
      account: (await AccountUtils.getUser()) as Account,
    });
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
              <Icon style={{paddingRight: 10}} name="database-plus" type="material-community" size={25} color="white" />
            }
            title="Eintragen"
            onPress={() => {
              this.props.navigation.navigate('CreateEntry');
            }}
          />
          <Button
            onPress={() => this.toggleQuickDrive()}
            style={{paddingHorizontal: 3}}
            buttonStyle={{width: 190, height: 50}}
            icon={<Icon style={{paddingRight: 10}} name="car" type="material-community" size={25} color="white" />}
            title={this.state.quickDriveStatus ? 'Fahrt beenden' : 'Fahrt starten'}
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
            icon={<Icon style={{paddingRight: 10}} name="car" type="material-community" size={25} color="#2089DC" />}
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
        <Button onPress={() => this.logOut()} title="Abmelden" type="clear" titleStyle={{fontWeight: '600'}} />
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
        async (startDate: Date, endDate: Date, startMileage: number, endMileage: number) => {
          this.checkQuickDriveStatus();
          this.props.navigation.navigate('CreateEntry');
        }
      );
    } else {
      await QuickDriveUtils.startQuickDrive(() => {
        console.log('enabled');
        this.checkQuickDriveStatus();
      });
    }
  }

  async logOut() {
    Alert.alert(
      'Bist du sicher?',
      'Möchtest du dich wirklich abmelden? Du kannst JetDriver nicht ohne ein Konto nutzen.',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'Abmelden',
          style: 'destructive',
          onPress: async () => {
            await AccountUtils.removeUser();
            this.setState({
              account: new Account('', '', '', ''),
            });
            await this.checkLoginState();
          },
        },
      ]
    );
  }
}

export default AppContext(Home);
