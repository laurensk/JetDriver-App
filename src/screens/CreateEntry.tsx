import React, {Component, ComponentClass} from 'react';
import {View, TextInput, Text, Button, ColorSchemeName} from 'react-native';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import AppContext from '../utils/AppContext';
import {ModalSheet} from '../toolbox/ModalSheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChooseCar from '../components/ChooseCar';
import ChooseRoadCondtions from '../components/ChooseRoadCondition';
import ChooseDaytime from '../components/ChooseDaytime';
import {Car} from '../models/Car';
import {Companion} from '../models/Companion';
import {RoadCondition} from '../models/RoadCondition';
import {Daytime} from '../models/Daytime';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ChooseCompanion from '../components/ChooseCompanion';

interface PropsType {
  route: NavigationRoute;
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {
  startMileage: string;
  endMileage: string;
  startDate: Date;
  endDate: Date;
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
      startDate: new Date(),
      endDate: new Date(),
      carModal: false,
      companionModal: false,
      roadConditionModal: false,
      daytimeModal: false,
    };
  }

  componentDidMount() {
    if (this.props.route.params?.quickDriver == true) {
      const {startMileage, endMileage, startDate, endDate} = this.props.route.params;
      console.log('param: ', JSON.parse(startDate));
      console.log('newdate: ', new Date());
      this.setState({
        startMileage: startMileage.toString(),
        endMileage: endMileage.toString(),
        startDate: JSON.parse(startDate) as Date,
        endDate: JSON.parse(endDate) as Date,
      });
    }
  }

  selectRoadCondition() {
    this.setState({roadConditionModal: true});
  }

  selectCar() {
    this.setState({carModal: true});
  }

  selectCompanion() {
    this.setState({companionModal: true});
  }

  selectDaytime() {
    this.setState({daytimeModal: true});
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ModalSheet
          headerTitle="Straßenzustand"
          headerCloseText="Abbrechen"
          headerOnClose={() => this.setState({roadConditionModal: false})}
          component={ChooseRoadCondtions}
          componentProps={{
            visible: (visible: boolean) => this.setState({roadConditionModal: visible}),
            chooseRoadCondition: (roadCondition: RoadCondition) =>
              this.setState({roadConditionSelected: roadCondition}),
          }}
          visible={this.state.roadConditionModal}
        />
        <ModalSheet
          headerTitle="Auto auswählen"
          headerCloseText="Abbrechen"
          headerOnClose={() => this.setState({carModal: false})}
          component={ChooseCar}
          componentProps={{
            visible: (visible: boolean) => this.setState({carModal: visible}),
            chooseCar: (car: Car) => this.setState({carSelected: car}),
          }}
          visible={this.state.carModal}
        />
        <ModalSheet
          headerTitle="Begleiter auswählen"
          headerCloseText="Abbrechen"
          headerOnClose={() => this.setState({companionModal: false})}
          component={ChooseCompanion}
          componentProps={{
            visible: (visible: boolean) => this.setState({companionModal: visible}),
            chooseCompanion: (companion: Companion) => this.setState({companionSelected: companion}),
          }}
          visible={this.state.companionModal}
        />
        <ModalSheet
          headerTitle="Tageszeit auswählen"
          headerCloseText="Abbrechen"
          headerOnClose={() => this.setState({daytimeModal: false})}
          component={ChooseDaytime}
          componentProps={{
            visible: (visible: boolean) => this.setState({daytimeModal: visible}),
            chooseDaytime: (daytime: Daytime) => this.setState({daytimeSelected: daytime}),
          }}
          visible={this.state.daytimeModal}
        />
        <KeyboardAwareScrollView>
          <View style={{padding: 30}}>
            <View
              style={{
                backgroundColor: '#FAFBFB',
                padding: 15,
                borderRadius: 5,
                borderColor: 'lightgrey',
                borderWidth: 1,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Startkilometerstand</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TextInput
                    placeholder="1234"
                    keyboardType="number-pad"
                    value={this.state.startMileage}
                    onChangeText={(t) => {
                      this.setState({startMileage: t});
                    }}></TextInput>
                  <Text> km</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                backgroundColor: '#FAFBFB',
                padding: 15,
                borderRadius: 5,
                borderColor: 'lightgrey',
                borderWidth: 1,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Startdatum</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TextInput
                    placeholder="6969"
                    value={
                      this.state.startDate.getDate() +
                      '.' +
                      String(this.state.startDate.getMonth() + 1) +
                      '.' +
                      this.state.startDate.getFullYear() +
                      ' ' +
                      this.state.startDate.getHours() +
                      ':' +
                      this.state.startDate.getMinutes()
                    }
                    onChangeText={(t) => {}}></TextInput>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 25,
                backgroundColor: '#FAFBFB',
                padding: 15,
                borderRadius: 5,
                borderColor: 'lightgrey',
                borderWidth: 1,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Endkilometerstand</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TextInput
                    placeholder="1234"
                    keyboardType="number-pad"
                    value={this.state.endMileage}
                    onChangeText={(t) => {
                      this.setState({endMileage: t});
                    }}></TextInput>
                  <Text> km</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                backgroundColor: '#FAFBFB',
                padding: 15,
                borderRadius: 5,
                borderColor: 'lightgrey',
                borderWidth: 1,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Enddatum</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TextInput
                    placeholder="6969"
                    value={
                      this.state.startDate.getDate() +
                      '.' +
                      String(this.state.startDate.getMonth() + 1) +
                      '.' +
                      this.state.startDate.getFullYear() +
                      ' ' +
                      this.state.startDate.getHours() +
                      ':' +
                      this.state.startDate.getMinutes()
                    }
                    onChangeText={(t) => {}}></TextInput>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 25,
                backgroundColor: '#FAFBFB',
                padding: 15,
                borderRadius: 5,
                borderColor: 'lightgrey',
                borderWidth: 1,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Fahrstecke</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <TextInput placeholder="Graz" value={this.state.startMileage} onChangeText={(t) => {}}></TextInput>
                </View>
              </View>
            </View>
            {/* Properties */}
            <TouchableOpacity onPress={() => this.selectRoadCondition()}>
              <View
                style={{
                  marginTop: 5,
                  backgroundColor: '#FAFBFB',
                  padding: 15,
                  borderRadius: 5,
                  borderColor: 'lightgrey',
                  borderWidth: 1,
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>Straßenzustand</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TextInput
                      editable={false}
                      placeholder="Auswählen"
                      value={this.state.roadConditionSelected?.roadCondition}
                      onChangeText={(t) => {}}></TextInput>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.selectCar()}>
              <View
                style={{
                  marginTop: 25,
                  backgroundColor: '#FAFBFB',
                  padding: 15,
                  borderRadius: 5,
                  borderColor: 'lightgrey',
                  borderWidth: 1,
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>Auto</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TextInput
                      editable={false}
                      placeholder="Auswählen"
                      value={this.state.carSelected?.name}
                      onChangeText={(t) => {}}></TextInput>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.selectCompanion()}>
              <View
                style={{
                  marginTop: 5,
                  backgroundColor: '#FAFBFB',
                  padding: 15,
                  borderRadius: 5,
                  borderColor: 'lightgrey',
                  borderWidth: 1,
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>Begleiter</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TextInput
                      editable={false}
                      placeholder="Auswählen"
                      value={this.state.companionSelected?.name}
                      onChangeText={(t) => {}}></TextInput>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.selectDaytime()}>
              <View
                style={{
                  marginTop: 5,
                  backgroundColor: '#FAFBFB',
                  padding: 15,
                  borderRadius: 5,
                  borderColor: 'lightgrey',
                  borderWidth: 1,
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>Tageszeit</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TextInput
                      editable={false}
                      placeholder="Auswählen"
                      value={this.state.daytimeSelected?.daytime}
                      onChangeText={(t) => {}}></TextInput>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  marginTop: 35,
                  backgroundColor: '#007AFF',
                  padding: 15,
                  borderRadius: 5,
                }}>
                <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                  <Text style={{fontSize: 17, color: 'white'}}>Eintrag speichern</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default AppContext(CreateEntry);
