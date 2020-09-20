import React from 'react';
import {ActivityIndicator, ColorSchemeName, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {Daytime} from '../models/Daytime';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import ScrollViewBackSwipe from '../toolbox/ScrollViewBackSwipe';
import AppContext from '../utils/AppContext';
import {DaytimeTranslation} from '../utils/DaytimeTranslation';

interface PropsType {
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
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
        <ScrollViewBackSwipe>
          <View style={{padding: 20}}>
            {this.state.loading && <ActivityIndicator></ActivityIndicator>}
            {!this.state.loading && (
              <View>
                {this.state.daytimes.map((daytime, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.selectDaytime(daytime)}>
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
                            {DaytimeTranslation.get(daytime.daytime)}
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

  fetchDaytimes() {
    ApiService.getDaytimes((daytimes: Daytime[], error: ApiError) => {
      this.setState({loading: false});
      if (error) setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      this.setState({daytimes: daytimes});
    });
  }

  selectDaytime(daytime: Daytime) {
    this.props.chooseDaytime(daytime);
    this.props.visible(false);
  }
}

export default AppContext(ChooseDaytime);
