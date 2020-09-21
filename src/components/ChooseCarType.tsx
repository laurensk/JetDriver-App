import React from 'react';
import {ActivityIndicator, ColorSchemeName, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {CarType} from '../models/CarType';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import ScrollViewBackSwipe from '../toolbox/ScrollViewBackSwipe';
import AppContext from '../utils/AppContext';
import {CarTypeTranslation} from '../utils/CarTypeTranslation';

interface PropsType {
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
  visible(visible: boolean): void;
  chooseCarType(carType: CarType): void;
}

interface StateType {
  loading: boolean;
  carTypes: CarType[];
}

class ChooseCarType extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      loading: true,
      carTypes: [],
    };
  }

  componentDidMount() {
    this.fetchCarTypes();
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
                {this.state.carTypes.map((carType, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.selectCarType(carType)}>
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
                            style={{fontWeight: 'bold', color: this.props.colorScheme == 'dark' ? 'white' : 'black'}}>
                            {CarTypeTranslation.get(carType.type)}
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

  fetchCarTypes() {
    ApiService.getCarTypes((carTypes: CarType[], error: ApiError) => {
      this.setState({loading: false});
      if (error) setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      if (carTypes) {
        this.setState({carTypes: carTypes});
      } else {
        this.props.visible(false);
      }
    });
  }

  selectCarType(carType: CarType) {
    this.props.chooseCarType(carType);
    this.props.visible(false);
  }
}

export default AppContext(ChooseCarType);
