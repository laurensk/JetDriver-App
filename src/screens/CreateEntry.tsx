import React, {Component, ComponentClass} from 'react';
import {View, TextInput, Text, Button, ColorSchemeName, Modal, StatusBar, useColorScheme} from 'react-native';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import {ApiService} from '../api/ApiService';
import AppContext from '../utils/AppContext';
import {ModalSheet} from '../toolbox/ModalSheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';
import {ChooseCar} from '../components/ChooseCar';
import {Car} from '../models/Car';
import {Companion} from '../models/Companion';
import {RoadCondition} from '../models/RoadCondition';
import {Daytime} from '../models/Daytime';

interface PropsType {
  route: NavigationRoute;
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {
  startMileage: string;
  endMileage: string;
  carModal: boolean;
  carSelected?: Car;
  companionModal: boolean;
  companionSelected?: Companion;
  roadConditionModal: boolean;
  roadConditionSelected?: RoadCondition;
  daytimeModal: boolean;
  daytimeSelected?: Daytime;
}

class CreateEntry extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      startMileage: '',
      endMileage: '',
      carModal: false,
      companionModal: false,
      roadConditionModal: false,
      daytimeModal: false,
    };
  }

  componentDidMount() {
    if (this.props.route.params?.quickDriver == true) {
      const {startMileage, endMileage, startDate, endDate} = this.props.route.params;
      console.log(startMileage, endMileage);
      this.setState({
        startMileage: startMileage.toString(),
        endMileage: endMileage.toString(),
      });
    }
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ModalSheet
          headerTitle="Auto auswählen"
          headerCloseText="Abbrechen"
          headerOnClose={() => this.setState({carModal: false})}
          component={() => (
            <ChooseCar
              visible={(visible: boolean) => this.setState({carModal: visible})}
              chooseCar={(car: Car) => this.setState({carSelected: car})}></ChooseCar>
          )}
          visible={this.state.carModal}
        />
        <Input
          autoCapitalize={'none'}
          defaultValue={this.state.startMileage}
          placeholder="Startkilometerstand"
          onChangeText={(value) => {}}
        />
        <Input
          autoCapitalize={'none'}
          defaultValue={this.state.endMileage}
          placeholder="Endkilometerstand"
          onChangeText={(value) => {}}
        />

        <Button
          title={'select car'}
          onPress={() => {
            this.setState({carModal: true});
          }}></Button>

        <Text>you've selected car {this.state.carSelected?.uuid}</Text>
      </View>
    );
  }
}

export default AppContext(CreateEntry);
