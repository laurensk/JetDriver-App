import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ApiError} from '../api/ApiError.model';
import {ApiErrorTranslation} from '../api/ApiErrorTranslation';
import {ApiService} from '../api/ApiService';
import {RoadCondition} from '../models/RoadCondition';
import {ErrorAlert} from '../toolbox/ErrorAlert';
import AppContext from '../utils/AppContext';
import {RoadConditionTranslation} from '../utils/RoadConditionTranslation';

interface PropsType {
  theme: {[k: string]: string};
  visible(visible: boolean): void;
  chooseRoadCondition(roadCondition: RoadCondition): void;
}

interface StateType {
  loading: boolean;
  roadConditions: RoadCondition[];
}

class ChooseRoadCondition extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      loading: true,
      roadConditions: [],
    };
  }

  componentDidMount() {
    this.fetchRoadConditions();
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
                {this.state.roadConditions.map((roadCondtion, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => this.selectRoadCondition(roadCondtion)}>
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
                          <Text style={{fontWeight: 'bold'}}>
                            {RoadConditionTranslation.get(roadCondtion.roadCondition)}
                          </Text>
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

  fetchRoadConditions() {
    ApiService.getRoadConditions((roadCondition: RoadCondition[], error: ApiError) => {
      this.setState({loading: false});
      if (error) setTimeout(() => ErrorAlert.present(ApiErrorTranslation.get(error.message)), 10);
      this.setState({roadConditions: roadCondition});
    });
  }

  selectRoadCondition(roadCondtion: RoadCondition) {
    this.props.chooseRoadCondition(roadCondtion);
    this.props.visible(false);
  }
}

export default AppContext(ChooseRoadCondition);
