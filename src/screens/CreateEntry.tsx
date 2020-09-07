import React, {Component, ComponentClass} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  ColorSchemeName,
  Modal,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {ApiService} from '../api/ApiService';
import AppContext from '../utils/AppContext';
import {ModalSheet} from '../toolbox/ModalSheet';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
  startMileage: number;
  startDate: Date;
  endMileage: number;
  endDate: Date;
}

interface StateType {
  carModal: boolean;
  carIdSelected: string;
}

class CreateEntry extends React.Component<PropsType, StateType> {
  apiService = new ApiService();

  constructor(props: PropsType) {
    super(props);
    this.state = {
      carModal: false,
      carIdSelected: '',
    };
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;
    const {startMileage, startDate, endMileage, endDate} = this.props;

    const chooseCarModal = () => {
      return (
        <View style={{flex: 1}}>
          <Text>hallo</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                carIdSelected: 'hello world',
                carModal: false,
              });
            }}>
            <Text>select car with id 1</Text>
          </TouchableOpacity>
          <TextInput></TextInput>
        </View>
      );
    };

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ModalSheet
          headerTitle="Auto auswählen"
          headerCloseText="Abbrechen"
          headerOnClose={() => {
            this.setState({
              carModal: false,
            });
          }}
          component={chooseCarModal}
          visible={this.state.carModal}></ModalSheet>

        <Button
          title={'select car'}
          onPress={() => {
            this.setState({carModal: true});
          }}></Button>

        <Text>you've selected car {this.state.carIdSelected}</Text>
      </View>
    );
  }

  createEntry(routeDest: string, dayTimeId: number) {
    this.apiService.createEntry(
      this.props.startDate,
      this.props.endDate,
      this.props.startMileage,
      this.props.endMileage,
      routeDest,
      '',
      'carid',
      1,
      dayTimeId,
      'comid',
      () => {
        // do some stuff
      },
    );
  }
}

export default AppContext(CreateEntry);
