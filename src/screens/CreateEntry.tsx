import React, {Component, ComponentClass, createRef} from 'react';
import {View, TextInput, Text, Button, ColorSchemeName, Alert} from 'react-native';
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
import {DaytimeTranslation} from '../utils/DaytimeTranslation';
import {RoadConditionTranslation} from '../utils/RoadConditionTranslation';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {ApiService} from '../api/ApiService';
import {Entry} from '../models/Entry';
import {ApiError} from '../api/ApiError.model';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';

interface PropsType {
  route: NavigationRoute;
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {
  startMileage: string;
  endMileage: string;
  startDateModal: boolean;
  startDate: Date;
  endDateModal: boolean;
  endDate: Date;
  routeDest: string;
  carModal: boolean;
  carSelected?: Car;
  companionModal: boolean;
  companionSelected?: Companion;
  roadConditionModal: boolean;
  roadConditionSelected?: RoadCondition;
  daytimeModal: boolean;
  daytimeSelected?: Daytime;
  loading: boolean;
}

class CreateEntry extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      startMileage: '',
      endMileage: '',
      startDateModal: false,
      startDate: new Date(),
      endDateModal: false,
      endDate: new Date(),
      routeDest: '',
      carModal: false,
      companionModal: false,
      roadConditionModal: false,
      daytimeModal: false,
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.route.params?.quickDriver == true) {
      const {startMileage, endMileage, startDate, endDate} = this.props.route.params;
      this.setState({
        startMileage: startMileage.toString(),
        endMileage: endMileage.toString(),
        startDate: new Date(Date.parse(JSON.parse(startDate))),
        endDate: new Date(Date.parse(JSON.parse(endDate))),
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
        <Spinner visible={this.state.loading}></Spinner>
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
        <DateTimePickerModal
          isVisible={this.state.startDateModal}
          headerTextIOS="Wähle ein Datum aus"
          cancelTextIOS="Abbrechen"
          confirmTextIOS="Speichern"
          mode="datetime"
          onConfirm={(date: Date) => this.setState({startDate: date, endDateModal: false})}
          onCancel={() => this.setState({startDateModal: false})}
        />
        <DateTimePickerModal
          isVisible={this.state.endDateModal}
          headerTextIOS="Wähle ein Datum aus"
          cancelTextIOS="Abbrechen"
          confirmTextIOS="Speichern"
          mode="datetime"
          onConfirm={(date: Date) => this.setState({endDate: date, endDateModal: false})}
          onCancel={() => this.setState({endDateModal: false})}
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
                    placeholder="Eingeben..."
                    keyboardType="number-pad"
                    value={this.state.startMileage}
                    onChangeText={(t) => {
                      this.setState({startMileage: t});
                    }}></TextInput>
                  <Text> km</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.setState({startDateModal: true})}>
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
                        (this.state.startDate.getHours() < 10 ? '0' : '') +
                        this.state.startDate.getHours() +
                        ':' +
                        (this.state.startDate.getMinutes() < 10 ? '0' : '') +
                        this.state.startDate.getMinutes()
                      }
                      editable={false}></TextInput>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
                    placeholder="Eingeben..."
                    keyboardType="number-pad"
                    value={this.state.endMileage}
                    onChangeText={(t) => {
                      this.setState({endMileage: t});
                    }}></TextInput>
                  <Text> km</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.setState({endDateModal: true})}>
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
                        this.state.endDate.getDate() +
                        '.' +
                        String(this.state.endDate.getMonth() + 1) +
                        '.' +
                        this.state.endDate.getFullYear() +
                        ' ' +
                        (this.state.endDate.getHours() < 10 ? '0' : '') +
                        this.state.endDate.getHours() +
                        ':' +
                        (this.state.endDate.getMinutes() < 10 ? '0' : '') +
                        this.state.endDate.getMinutes()
                      }
                      editable={false}></TextInput>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', maxWidth: 200}}>
                  <TextInput
                    placeholder="Eingeben..."
                    value={this.state.routeDest}
                    onChangeText={(t) => {
                      this.setState({routeDest: t});
                    }}></TextInput>
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
                      value={RoadConditionTranslation.get(
                        this.state.roadConditionSelected?.roadCondition || ''
                      )}></TextInput>
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
                      value={this.state.carSelected?.name}></TextInput>
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
                      value={this.state.companionSelected?.name}></TextInput>
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
                      value={DaytimeTranslation.get(this.state.daytimeSelected?.daytime || '')}></TextInput>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.createEntry();
              }}>
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

  createEntry() {
    if (this.validateEntry()) {
      this.postEntry(
        Number(this.state.startDate.getTime()),
        Number(this.state.endDate.getTime()),
        Number(this.state.startMileage),
        Number(this.state.endMileage),
        this.state.routeDest,
        this.state.roadConditionSelected?.id || -1,
        this.state.carSelected?.uuid || '',
        this.state.companionSelected?.uuid || '',
        this.state.daytimeSelected?.id || -1
      );
    } else {
      Alert.alert('Fehler', 'Die eingegebenen Daten sind ungültig. Bitte überprüfe deine Eingaben.');
    }
  }

  validateEntry() {
    return (
      Number(this.state.startMileage) > 0 &&
      Number(this.state.endMileage) > 0 &&
      Number(this.state.endMileage) > Number(this.state.startMileage) &&
      this.state.routeDest.length > 0 &&
      this.state.roadConditionSelected &&
      this.state.carSelected &&
      this.state.companionSelected &&
      this.state.daytimeSelected
    );
  }

  postEntry(
    startDate: Number,
    endDate: Number,
    startMileage: Number,
    endMileage: Number,
    routeDest: String,
    roadConditionId: Number,
    carUuid: String,
    companionUuid: String,
    daytimeId: Number
  ) {
    this.setState({loading: true});
    ApiService.createEntry(
      startDate,
      endDate,
      startMileage,
      endMileage,
      routeDest,
      roadConditionId,
      carUuid,
      companionUuid,
      daytimeId,
      (entry: Entry, error: ApiError) => {
        this.setState({loading: false});
        if (error) {
          setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
        } else {
          this.props.navigation.goBack();
          setTimeout(() => this.props.navigation.navigate('Entries'), 10);
        }
      }
    );
  }
}

export default AppContext(CreateEntry);
