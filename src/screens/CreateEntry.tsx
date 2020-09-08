import React, {Component, ComponentClass} from 'react';
import {View, TextInput, Text, Button, ColorSchemeName, Modal, StatusBar, useColorScheme} from 'react-native';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import {ApiService} from '../api/ApiService';
import AppContext from '../utils/AppContext';
import {ModalSheet} from '../toolbox/ModalSheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';

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
  carIdSelected: string;
  companionModal: boolean;
  companionIdSelected: string;
  roadConditionModal: boolean;
  roadConditionIdSelected: number;
  daytimeModal: boolean;
  daytimeIdSelected: number;
}

class CreateEntry extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      startMileage: '',
      endMileage: '',
      carModal: false,
      carIdSelected: '',
      companionModal: false,
      companionIdSelected: '',
      roadConditionModal: false,
      roadConditionIdSelected: -1,
      daytimeModal: false,
      daytimeIdSelected: -1,
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

        <Text>you've selected car {this.state.carIdSelected}</Text>
      </View>
    );
  }
}

export default AppContext(CreateEntry);
