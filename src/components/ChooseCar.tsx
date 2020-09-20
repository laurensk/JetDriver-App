import React from 'react';
import {ActivityIndicator, ColorSchemeName, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {Car} from '../models/Car';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import ScrollViewBackSwipe from '../toolbox/ScrollViewBackSwipe';
import AppContext from '../utils/AppContext';

interface PropsType {
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
  visible(visible: boolean): void;
  chooseCar(car: Car): void;
}

interface StateType {
  loading: boolean;
  cars: Car[];
}

class ChooseCar extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      loading: true,
      cars: [],
    };
  }

  componentDidMount() {
    this.fetchCars();
  }

  render() {
    const {theme} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ScrollViewBackSwipe>
          <View style={{padding: 20}}>
            {this.state.loading && <ActivityIndicator></ActivityIndicator>}
            {!this.state.loading && (
              <View>
                {this.state.cars.map((car, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.selectCar(car)}>
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

  fetchCars() {
    ApiService.getCars((cars: Car[], error: ApiError) => {
      this.setState({loading: false});
      if (error) setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      if (cars) {
        this.setState({cars: cars});
      } else {
        this.props.visible(false);
      }
    });
  }

  selectCar(car: Car) {
    this.props.chooseCar(car);
    this.props.visible(false);
  }
}

export default AppContext(ChooseCar);
