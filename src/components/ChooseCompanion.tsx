import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {Companion} from '../models/Companion';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import AppContext from '../utils/AppContext';

interface PropsType {
  theme: {[k: string]: string};
  visible(visible: boolean): void;
  chooseCompanion(companion: Companion): void;
}

interface StateType {
  loading: boolean;
  companions: Companion[];
}

class ChooseCompanion extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      loading: true,
      companions: [],
    };
  }

  componentDidMount() {
    this.fetchCompanions();
  }

  render() {
    const {theme} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ScrollView>
          <View style={{padding: 20}}>
            {this.state.loading && <ActivityIndicator></ActivityIndicator>}
            {!this.state.loading && (
              <View>
                {this.state.companions.map((companion, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.selectCompanion(companion)}>
                      <View style={{flex: 1, paddingVertical: 5}}>
                        <View
                          style={{
                            flex: 1,
                            marginTop: 5,
                            backgroundColor: '#FAFBFB',
                            padding: 15,
                            borderRadius: 5,
                            borderColor: 'lightgrey',
                            borderWidth: 1,
                          }}>
                          <Text style={{fontWeight: 'bold'}}>{companion.name}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  fetchCompanions() {
    ApiService.getCompanions((companions: Companion[], error: ApiError) => {
      this.setState({loading: false});
      if (error) setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      this.setState({companions: companions});
    });
  }

  selectCompanion(companion: Companion) {
    this.props.chooseCompanion(companion);
    this.props.visible(false);
  }
}

export default AppContext(ChooseCompanion);
