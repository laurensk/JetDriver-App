import React from 'react';
import {ActivityIndicator, ColorSchemeName, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {Companion} from '../models/Companion';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import ScrollViewBackSwipe from '../toolbox/ScrollViewBackSwipe';
import AppContext from '../utils/AppContext';

interface PropsType {
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
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
        <ScrollViewBackSwipe>
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

  fetchCompanions() {
    ApiService.getCompanions((companions: Companion[], error: ApiError) => {
      this.setState({loading: false});
      if (error) setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      if (companions) {
        this.setState({companions: companions});
      } else {
        this.props.visible(false);
      }
    });
  }

  selectCompanion(companion: Companion) {
    this.props.chooseCompanion(companion);
    this.props.visible(false);
  }
}

export default AppContext(ChooseCompanion);
