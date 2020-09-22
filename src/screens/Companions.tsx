import React from 'react';
import {View, Text, ColorSchemeName, ActivityIndicator, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';
import {ApiDeletion} from '../api/ApiDeletion.model';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {Car} from '../models/Car';
import {Companion} from '../models/Companion';
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
  companions: Companion[];
}

export class Companions extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.fetchCompanions = this.fetchCompanions.bind(this);
    this.createCompanion = this.createCompanion.bind(this);
    this.state = {
      loading: false,
      companions: [],
    };
  }

  static navigationButton = (route: any, navigation: any) => {
    let createCompanion: Function;
    if (route.params) {
      createCompanion = route.params.createCompanion;
    } else {
      createCompanion = () => {};
    }
    return (
      <TouchableOpacity onPress={() => createCompanion()}>
        <Icon name="add" size={30} color="#027BFF"></Icon>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this.props.navigation.setParams({
      fetchCompanions: this.fetchCompanions,
    });
    this.props.navigation.setParams({
      createCompanion: this.createCompanion,
    });
    this.fetchCompanions();
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ScrollViewBackSwipe>
          <View style={{paddingTop: 10, paddingBottom: 30}}>
            {this.state.loading && <ActivityIndicator></ActivityIndicator>}
            {!this.state.loading && this.state.companions.length == 0 && (
              <View>
                <Text style={{color: 'grey', paddingTop: 50, textAlign: 'center'}}>Keine Begleiter vorhanden</Text>
              </View>
            )}
            {!this.state.loading && this.state.companions.length > 0 && (
              <View style={{paddingHorizontal: 20}}>
                {this.state.companions.map((companion, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.companionSelected(companion)}>
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
                            {companion.name}
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

  createCompanion() {
    this.props.navigation.navigate('CreateCompanion', {fetchCompanions: this.fetchCompanions});
  }

  fetchCompanions() {
    this.setState({loading: true});
    ApiService.getCompanions((companions: Companion[], error: ApiError) => {
      this.setState({loading: false});
      if (error && error.message != 'COMPANION_NOT_FOUND')
        return setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      console.log('companions: ', companions);
      if (companions) {
        this.setState({companions: companions});
      } else {
        this.setState({companions: []});
      }
    });
  }

  deleteCompanion(companion: Companion) {
    ApiService.deleteCompanion(companion, (deletion: ApiDeletion, error: ApiError) => {
      if (error && error.message != 'COMPANION_NOT_FOUND')
        return setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      if (deletion.success != true) return setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get('ERROR')), 10);
      this.fetchCompanions();
    });
  }

  confirmCompanionDeletion(companion: Companion) {
    Alert.alert('Bist du sicher?', "Begleiter '" + companion.name + "' löschen?", [
      {
        text: 'Begleiter löschen',
        style: 'destructive',
        onPress: () => {
          this.deleteCompanion(companion);
        },
      },
      {
        text: 'Abbrechen',
        style: 'cancel',
      },
    ]);
  }

  companionSelected(companion: Companion) {
    Alert.alert(
      'Begleiter bearbeiten',
      "Welche Aktion möchtest du auf den Begleiter '" + companion.name + "' anwenden?",
      [
        {
          text: 'Begleiter löschen',
          style: 'destructive',
          onPress: () => {
            this.confirmCompanionDeletion(companion);
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

export default AppContext(Companions);
