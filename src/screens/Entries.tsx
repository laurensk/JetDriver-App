import React, {Ref} from 'react';
import {View, Text, ColorSchemeName, ActivityIndicator, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';
import {ApiDeletion} from '../api/ApiDeletion.model';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {Entry} from '../models/Entry';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import ScrollViewBackSwipe from '../toolbox/ScrollViewBackSwipe';
import AppContext from '../utils/AppContext';
import {DaytimeTranslation} from '../utils/DaytimeTranslation';
import {RoadConditionTranslation} from '../utils/RoadConditionTranslation';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {
  loading: boolean;
  entries: Entry[];
  mileageSum: number;
}

export class Entries extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.fetchEntries = this.fetchEntries.bind(this);
    this.createEntry = this.createEntry.bind(this);
    this.state = {
      loading: false,
      entries: [],
      mileageSum: 0,
    };
  }

  static navigationButton = (route: any, navigation: any) => {
    let createEntry: Function;
    if (route.params) {
      createEntry = route.params.createEntry;
    } else {
      createEntry = () => {};
    }
    return (
      <TouchableOpacity onPress={() => createEntry()}>
        <Icon name="add" size={30} color="#027BFF"></Icon>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this.props.navigation.setParams({
      createEntry: this.createEntry,
    });
    this.props.navigation.setParams({
      fetchEntries: this.fetchEntries,
    });
    this.fetchEntries();
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ScrollViewBackSwipe>
          <View style={{paddingTop: 10, paddingBottom: 30}}>
            {this.state.loading && <ActivityIndicator></ActivityIndicator>}
            {!this.state.loading && this.state.entries.length == 0 && (
              <View>
                <Text style={{color: 'grey', paddingTop: 50, textAlign: 'center'}}>Keine Einträge vorhanden</Text>
              </View>
            )}
            {!this.state.loading && (
              <View style={{paddingHorizontal: 20}}>
                <View style={{flex: 1, paddingVertical: 5}}>
                  {this.state.entries.length > 0 && (
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
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: this.props.colorScheme == 'dark' ? 'white' : 'black',
                          }}>
                          {this.state.mileageSum} km
                        </Text>
                        <Text
                          style={{
                            fontSize: 17,
                            color: this.props.colorScheme == 'dark' ? 'white' : 'black',
                          }}>
                          Summe Kilometer
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                {this.state.entries.map((entry, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.entrySelected(entry)}>
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
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                paddingBottom: 5,
                                color: this.props.colorScheme == 'dark' ? 'white' : 'black',
                              }}>
                              {entry.endMileage - entry.startMileage} km
                            </Text>
                            <Text style={{fontSize: 17, color: this.props.colorScheme == 'dark' ? 'white' : 'black'}}>
                              {'  •  '}
                              {entry.startMileage} km - {entry.endMileage} km
                            </Text>
                          </View>
                          <Text style={{paddingBottom: 5, color: this.props.colorScheme == 'dark' ? 'white' : 'black'}}>
                            {new Date(entry.startDate).toLocaleString('de-DE')}
                          </Text>
                          <Text style={{paddingBottom: 5, color: this.props.colorScheme == 'dark' ? 'white' : 'black'}}>
                            {entry.routeDest}
                          </Text>
                          <Text style={{paddingBottom: 5, color: this.props.colorScheme == 'dark' ? 'white' : 'black'}}>
                            {DaytimeTranslation.get(entry.daytimeId.daytime)}
                            {'  •  '}
                            {RoadConditionTranslation.get(entry.roadCondition.roadCondition)}
                            {'  •  '}
                            {entry.companion.name}
                          </Text>
                          <Text style={{color: this.props.colorScheme == 'dark' ? 'white' : 'black'}}>
                            {entry.car.numberPlate}
                            {'  •  '}
                            {entry.car.carType}
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

  createEntry() {
    this.props.navigation.navigate('CreateEntry', {fetchEntries: this.fetchEntries});
  }

  fetchEntries() {
    this.setState({loading: true});
    ApiService.getEntries((entries: Entry[], error: ApiError) => {
      this.setState({loading: false});
      if (error && error.message != 'ENTRY_NOT_FOUND')
        return setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      let sortEntries: Entry[] = [];
      if (entries) sortEntries = entries;
      if (sortEntries.length > 0) {
        entries.sort((a, b) => b.startDate - a.startDate);
        this.setState({mileageSum: 0});
        let mileageSum: number = 0;
        entries.forEach((entry) => {
          mileageSum += entry.endMileage - entry.startMileage;
        });
        this.setState({mileageSum: mileageSum});
      }
      this.setState({entries: sortEntries});
    });
  }

  deleteEntry(entry: Entry) {
    ApiService.deleteEntry(entry, (deletion: ApiDeletion, error: ApiError) => {
      if (error && error.message != 'ENTRY_NOT_FOUND')
        return setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      if (deletion.success != true) return setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get('ERROR')), 10);
      this.fetchEntries();
    });
  }

  confirmEntryDeletion(entry: Entry) {
    Alert.alert(
      'Bist du sicher?',
      "Eintrag '" +
        (entry.endMileage - entry.startMileage) +
        ' km • ' +
        entry.startMileage +
        ' km - ' +
        entry.endMileage +
        'km' +
        "' löschen?",
      [
        {
          text: 'Eintrag löschen',
          style: 'destructive',
          onPress: () => {
            this.deleteEntry(entry);
          },
        },
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
      ]
    );
  }

  entrySelected(entry: Entry) {
    Alert.alert(
      'Eintrag bearbeiten',
      "Welche Aktion möchtest du auf den Eintrag '" +
        (entry.endMileage - entry.startMileage) +
        ' km • ' +
        entry.startMileage +
        ' km - ' +
        entry.endMileage +
        'km' +
        "' anwenden?",
      [
        {
          text: 'Eintrag löschen',
          style: 'destructive',
          onPress: () => {
            this.confirmEntryDeletion(entry);
          },
        },
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
      ]
    );
  }
}

export default AppContext(Entries);
