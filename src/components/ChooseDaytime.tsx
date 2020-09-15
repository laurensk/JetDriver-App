import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {Daytime} from '../models/Daytime';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import AppContext from '../utils/AppContext';

interface PropsType {
  theme: {[k: string]: string};
  visible(visible: boolean): void;
  chooseDaytime(daytime: Daytime): void;
}

interface StateType {
  loading: boolean;
  daytimes: Daytime[];
}

class ChooseDaytime extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      loading: true,
      daytimes: [],
    };
  }

  componentDidMount() {
    this.fetchDaytimes();
  }

  render() {
    const {theme} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ScrollView>
          <View style={{padding: 30}}>
            {this.state.loading && <ActivityIndicator></ActivityIndicator>}
            {!this.state.loading && (
              <View>
                {this.state.daytimes.map((daytime, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.selectCompanion(daytime)}>
                      <View style={{height: 120, flex: 1, paddingBottom: 10}}>
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
                          <Text>{daytime.daytime}</Text>
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

  fetchDaytimes() {
    ApiService.getDaytimes((daytimes: Daytime[], error: ApiError) => {
      this.setState({loading: false});
      if (error) setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      this.setState({daytimes: daytimes});
    });
  }

  selectCompanion(daytime: Daytime) {
    this.props.chooseDaytime(daytime);
    this.props.visible(false);
  }
}

export default AppContext(ChooseDaytime);
