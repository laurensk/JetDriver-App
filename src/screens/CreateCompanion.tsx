import React from 'react';
import {View, TextInput, Text, ColorSchemeName, Alert, Platform} from 'react-native';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import AppContext from '../utils/AppContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {ApiService} from '../api/ApiService';
import {ApiError} from '../api/ApiError.model';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import ScrollViewBackView from '../toolbox/ScrollViewBackView';
import {Companion} from '../models/Companion';

interface PropsType {
  route: NavigationRoute;
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {
  name: string;
  loading: boolean;
}

class CreateCompanion extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      name: '',
      loading: false,
    };
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <Spinner visible={this.state.loading}></Spinner>
        <ScrollViewBackView>
          <KeyboardAwareScrollView>
            <View style={{padding: 30}}>
              <View
                style={{
                  backgroundColor: this.props.colorScheme == 'dark' ? '#121212' : '#FAFBFB',
                  padding: 15,
                  borderRadius: 5,
                  borderColor: this.props.colorScheme == 'dark' ? '#121212' : 'lightgrey',
                  borderWidth: 1,
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: this.props.colorScheme == 'dark' ? 'white' : 'black',
                    }}>
                    Name
                  </Text>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end', maxWidth: 200}}>
                    <TextInput
                      placeholderTextColor={
                        Platform.OS == 'android' && this.props.colorScheme == 'dark' ? 'grey' : undefined
                      }
                      style={{
                        color: this.props.colorScheme == 'dark' ? 'white' : 'black',
                        paddingVertical: Platform.OS == 'android' ? 0 : undefined,
                        marginTop: Platform.OS == 'android' ? -4 : undefined,
                      }}
                      placeholder="Eingeben..."
                      value={this.state.name}
                      onChangeText={(t) => {
                        this.setState({name: t});
                      }}></TextInput>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.createCompanion();
                }}>
                <View
                  style={{
                    marginTop: 35,
                    backgroundColor: '#007AFF',
                    padding: 15,
                    borderRadius: 5,
                  }}>
                  <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                    <Text style={{fontSize: 17, color: 'white'}}>Begleiter anlegen</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollViewBackView>
      </View>
    );
  }

  createCompanion() {
    console.log(this.validateCompanion());
    if (this.validateCompanion()) {
      this.postCompanion(this.state.name);
    } else {
      Alert.alert('Fehler', 'Die eingegebenen Daten sind ungültig. Bitte überprüfe deine Eingaben.');
    }
  }

  validateCompanion() {
    return this.state.name.length > 4;
  }

  postCompanion(name: string) {
    ApiService.createCompanion(name, (companion: Companion, error: ApiError) => {
      this.setState({loading: false});
      if (error) {
        setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      } else {
        this.props.navigation.goBack();
        if (this.props.route.params?.fetchCompanions) {
          this.props.route.params.fetchCompanions();
        }
      }
    });
  }
}

export default AppContext(CreateCompanion);
