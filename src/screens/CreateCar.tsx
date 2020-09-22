import React from 'react';
import {View, TextInput, Text, Button, ColorSchemeName, Alert, TouchableHighlightBase, Platform} from 'react-native';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import AppContext from '../utils/AppContext';
import {ModalSheet} from '../toolbox/ModalSheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChooseRoadCondtions from '../components/ChooseRoadCondition';
import {Car} from '../models/Car';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {ApiService} from '../api/ApiService';
import {ApiError} from '../api/ApiError.model';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import ScrollViewBackView from '../toolbox/ScrollViewBackView';
import {CarType} from '../models/CarType';
import ChooseCarType from '../components/ChooseCarType';
import {CarTypeTranslation} from '../utils/CarTypeTranslation';

interface PropsType {
  route: NavigationRoute;
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {
  carTypeModel: boolean;
  carType?: CarType;
  numberPlate: string;
  name: string;
  brand: string;
  model: string;
  loading: boolean;
}

class CreateCar extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      carTypeModel: false,
      numberPlate: '',
      name: '',
      brand: '',
      model: '',
      loading: false,
    };
  }

  selectCarType() {
    this.setState({carTypeModel: true});
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <Spinner visible={this.state.loading}></Spinner>
        <ModalSheet
          headerTitle="Autotyp auswählen"
          headerCloseText="Abbrechen"
          headerOnClose={() => this.setState({carTypeModel: false})}
          component={ChooseCarType}
          componentProps={{
            visible: (visible: boolean) => this.setState({carTypeModel: visible}),
            chooseCarType: (carType: CarType) => this.setState({carType: carType}),
          }}
          visible={this.state.carTypeModel}
        />
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
              <View
                style={{
                  marginTop: 25,
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
                    Kennzeichen
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
                      value={this.state.numberPlate}
                      onChangeText={(t) => {
                        this.setState({numberPlate: t});
                      }}></TextInput>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.setState({carTypeModel: true})}>
                <View
                  style={{
                    marginTop: 5,
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
                      Autotyp
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TextInput
                        placeholderTextColor={
                          Platform.OS == 'android' && this.props.colorScheme == 'dark' ? 'grey' : undefined
                        }
                        style={{
                          color: this.props.colorScheme == 'dark' ? 'white' : 'black',
                          paddingVertical: Platform.OS == 'android' ? 0 : undefined,
                          marginTop: Platform.OS == 'android' ? -4 : undefined,
                        }}
                        placeholder="Auswählen"
                        value={CarTypeTranslation.get(this.state.carType?.type || '')}
                        editable={false}></TextInput>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 25,
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
                    Hersteller
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
                      value={this.state.brand}
                      onChangeText={(t) => {
                        this.setState({brand: t});
                      }}></TextInput>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
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
                    Modell
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
                      value={this.state.model}
                      onChangeText={(t) => {
                        this.setState({model: t});
                      }}></TextInput>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.createCar();
                }}>
                <View
                  style={{
                    marginTop: 35,
                    backgroundColor: '#007AFF',
                    padding: 15,
                    borderRadius: 5,
                  }}>
                  <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                    <Text style={{fontSize: 17, color: 'white'}}>Auto anlegen</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollViewBackView>
      </View>
    );
  }

  createCar() {
    if (this.validateCar()) {
      this.postCar(
        this.state.carType?.id || -1,
        this.state.name,
        this.state.numberPlate,
        this.state.brand,
        this.state.model
      );
    } else {
      Alert.alert('Fehler', 'Die eingegebenen Daten sind ungültig. Bitte überprüfe deine Eingaben.');
    }
  }

  validateCar() {
    return (
      this.state.carType &&
      this.state.name.length > 0 &&
      this.state.numberPlate.length > 4 &&
      this.state.brand.length > 0 &&
      this.state.model.length > 0
    );
  }

  postCar(carTypeId: number, name: string, numberPlate: string, brand: string, model: string) {
    ApiService.createCar(carTypeId, name, numberPlate, brand, model, (car: Car, error: ApiError) => {
      this.setState({loading: false});
      if (error) {
        setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      } else {
        this.props.navigation.goBack();
        if (this.props.route.params?.fetchCars) {
          this.props.route.params.fetchCars();
        }
      }
    });
  }
}

export default AppContext(CreateCar);
