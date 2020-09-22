import React from 'react';
import {View, Text, ColorSchemeName, ActivityIndicator, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';
import {ApiDeletion} from '../api/ApiDeletion.model';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {Car} from '../models/Car';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import ScrollViewBackSwipe from '../toolbox/ScrollViewBackSwipe';
import AppContext from '../utils/AppContext';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {
  loading: boolean;
  cars: Car[];
}

export class Cars extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.fetchCars = this.fetchCars.bind(this);
    this.createCar = this.createCar.bind(this);
    this.state = {
      loading: false,
      cars: [],
    };
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

  componentDidMount() {
    this.props.navigation.setParams({
      fetchCars: this.fetchCars,
    });
    this.props.navigation.setParams({
      createCar: this.createCar,
    });
    this.fetchCars();
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ScrollViewBackSwipe>
          <View style={{paddingTop: 10, paddingBottom: 30}}>
            {this.state.loading && <ActivityIndicator></ActivityIndicator>}
            {!this.state.loading && this.state.cars.length == 0 && (
              <View>
                <Text style={{color: 'grey', paddingTop: 50, textAlign: 'center'}}>Keine Autos vorhanden</Text>
              </View>
            )}
            {!this.state.loading && this.state.cars.length > 0 && (
              <View style={{paddingHorizontal: 20}}>
                {this.state.cars.map((car, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.carSelected(car)}>
                      <View style={{flex: 1, paddingVertical: 5}}>
                        <View
                          style={{
                            flex: 1,
                            marginTop: 5,
                            backgroundColor: this.props.colorScheme == 'dark' ? '#121212' : '#FAFBFB',
                            padding: 15,
                            borderRadius: 5,
                            borderColor: this.props.colorScheme == 'dark' ? '#121212' : 'lightgrey',
                            borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              paddingBottom: 5,
                              color: this.props.colorScheme == 'dark' ? 'white' : 'black',
                            }}>
                            {car.name}
                          </Text>
                          <Text style={{paddingBottom: 5, color: this.props.colorScheme == 'dark' ? 'white' : 'black'}}>
                            {car.brand} {car.model}
                          </Text>
                          <Text style={{color: this.props.colorScheme == 'dark' ? 'white' : 'black'}}>
                            {car.numberPlate}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollViewBackSwipe>
      </View>
    );
  }

  createCar() {
    this.props.navigation.navigate('CreateCar', {fetchCars: this.fetchCars});
  }

  fetchCars() {
    this.setState({loading: true});
    ApiService.getCars((cars: Car[], error: ApiError) => {
      this.setState({loading: false});
      if (error && error.message != 'CAR_NOT_FOUND')
        return setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      if (cars) {
        this.setState({cars: cars});
      } else {
        this.setState({cars: []});
      }
    });
  }

  deleteCar(car: Car) {
    ApiService.deleteCar(car, (deletion: ApiDeletion, error: ApiError) => {
      if (error && error.message != 'CAR_NOT_FOUND')
        return setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      if (deletion.success != true) return setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get('ERROR')), 10);
      this.fetchCars();
    });
  }

  confirmCarDeletion(car: Car) {
    Alert.alert('Bist du sicher?', "Auto: '" + car.name + "' löschen?", [
      {
        text: 'Eintrag löschen',
        style: 'destructive',
        onPress: () => {
          this.deleteCar(car);
        },
      },
      {
        text: 'Abbrechen',
        style: 'cancel',
      },
    ]);
  }

  carSelected(car: Car) {
    Alert.alert('Auto bearbeiten', "Welche Aktion möchtest du auf das Auto '" + car.name + "' anwenden?", [
      {
        text: 'Auto löschen',
        style: 'destructive',
        onPress: () => {
          this.confirmCarDeletion(car);
        },
      },
      {
        text: 'Abbrechen',
        style: 'cancel',
      },
    ]);
  }
}

export default AppContext(Cars);
