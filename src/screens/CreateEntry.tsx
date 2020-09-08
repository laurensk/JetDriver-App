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

  render() {
    const {theme, colorScheme, navigation} = this.props;

    const startDate = this.props.route.params || undefined;
    const endDate = this.props.route.params || undefined;
    const startMileage = this.props.route.params || undefined;
    const endMileage = this.props.route.params || undefined;

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
          defaultValue={startMileage.toString()}
          placeholder="Startkilometerstand"
          onChangeText={(value) => {}}
        />
        <Input
          autoCapitalize={'none'}
          defaultValue={String(endMileage)}
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
