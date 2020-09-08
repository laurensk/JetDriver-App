import React from 'react';
import {View, Text, ColorSchemeName, Image, Linking} from 'react-native';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import AppContext from '../utils/AppContext';
import NavigationModal from '../toolbox/NavigationModal';
import SegmentedControl from '@react-native-community/segmented-control';
import {Input, Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {ApiService} from '../api/ApiService';
import {User} from '../models/User';
import {ApiError} from '../api/ApiError.model';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  route: NavigationRoute;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {
  activityIndicator: boolean;
  loginSegment: number;
  name: string;
  email: string;
  password: string;
}

class Login extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      activityIndicator: false,
      loginSegment: 0,
      name: '',
      email: '',
      password: '',
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
        <Spinner visible={this.state.activityIndicator}></Spinner>
        <KeyboardAwareScrollView
          extraHeight={100}
          style={{flex: 1}}
          resetScrollToCoords={{x: 0, y: 0}}>
          <View>
            <View
              style={{alignItems: 'center', paddingBottom: 50, paddingTop: 50}}>
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
                height: 350,
              }}>
              {this.state.loginSegment == 0 && (
                <Input
                  placeholder="Name"
                  defaultValue={this.state.name}
                  autoCorrect={false}
                  onChangeText={(name) => {
                    this.setState({name: name});
                  }}
                />
              )}
              <Input
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                autoCorrect={false}
                placeholder="E-Mail"
                onChangeText={(email) => {
                  this.setState({email: email});
                }}
              />
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                placeholder="Passwort"
                onChangeText={(password) => {
                  this.setState({password: password});
                }}
              />
              {this.state.loginSegment == 0 && (
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 350,
                    paddingTop: 10,
                  }}>
                  <Text>Wenn du ein Konto erstellst, stimmst du unseren</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.openTerms()}>
                      <Text style={{color: '#2089DC'}}> AGB's </Text>
                    </TouchableOpacity>
                    <Text>und der </Text>
                    <TouchableOpacity onPress={() => this.openPrivacyPolicy()}>
                      <Text style={{color: '#2089DC'}}>
                        Datenschutzerklärung{' '}
                      </Text>
                    </TouchableOpacity>
                    <Text>zu.</Text>
                  </View>
                </View>
              )}
              {this.state.loginSegment == 1 && (
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 350,
                    paddingTop: 10,
                  }}>
                  <Text>Wenn du dich anmeldest, stimmst du unseren</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.openTerms()}>
                      <Text style={{color: '#2089DC'}}> AGB's </Text>
                    </TouchableOpacity>
                    <Text>und der </Text>
                    <TouchableOpacity onPress={() => this.openPrivacyPolicy()}>
                      <Text style={{color: '#2089DC'}}>
                        Datenschutzerklärung{' '}
                      </Text>
                    </TouchableOpacity>
                    <Text>zu.</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={{paddingTop: 30}}>
              <Button
                onPress={() => this.loginSignUpButton()}
                style={{width: '80%', alignSelf: 'center', paddingBottom: 20}}
                title={
                  this.state.loginSegment == 0 ? 'Konto erstellen' : 'Anmelden'
                }
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  loginSignUpButton() {
    if (this.state.loginSegment == 0) {
      this.signUpWith(this.state.name, this.state.email, this.state.password);
    } else {
      this.loginWith(this.state.email, this.state.password);
    }
  }

  loginWith(email: string, password: string) {
    this.setState({activityIndicator: true});
    ApiService.login(email, password, (user: User, error: ApiError) => {
      this.setState({activityIndicator: false});
      if (error) {
        setTimeout(
          () => ErrorAlert.present(ApiErrorTranslation.get(error.message)),
          10,
        );
      } else {
        this.props.navigation.goBack();
      }
    });
  }

  signUpWith(name: string, email: string, password: string) {
    this.setState({activityIndicator: true});
    ApiService.signUp(name, email, password, (user: User, error: ApiError) => {
      this.setState({activityIndicator: false});
      if (error) {
        setTimeout(
          () => ErrorAlert.present(ApiErrorTranslation.get(error.message)),
          10,
        );
      } else {
        this.props.navigation.goBack();
      }
    });
  }

  async openTerms() {
    const termsUrl = 'https://legal.laurensk.at/terms-and-conditions/?lang=de';
    if (await Linking.canOpenURL(termsUrl)) {
      await Linking.openURL(termsUrl);
    }
  }

  async openPrivacyPolicy() {
    const privacyPolicyUrl =
      'https://legal.laurensk.at/privacy-policy/?lang=de';
    if (await Linking.canOpenURL(privacyPolicyUrl)) {
      await Linking.openURL(privacyPolicyUrl);
    }
  }
}

export default AppContext(
  NavigationModal(Login, {
    title: 'Willkommen bei JetDriver',
    largeTitle: false,
    gestureEnabled: false,
  }),
);
