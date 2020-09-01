import React from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  ColorSchemeName,
  Modal,
  StatusBar,
} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {ApiService} from '../api/ApiService';
import AppContext from '../utils/AppContext';
import {Header} from 'react-native-elements';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
  startMileage: number;
  startDate: Date;
  endMileage: number;
  endDate: Date;
}

interface StateType {
  showModal: boolean;
}

class CreateEntry extends React.Component<PropsType, StateType> {
  apiService = new ApiService();

  constructor(props: PropsType) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;
    const {startMileage, startDate, endMileage, endDate} = this.props;

    const carId = '7d05ef86-68de-4abf-96d0-a2090edbf707';
    const companionId = 'f0db7f18-65e6-4bdc-8b5b-cfcc804f50af';
    const roadConditionId = 1;

    let routeDest = '';
    let dayTimeId = '';

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <Modal
          animationType="slide"
          visible={this.state.showModal}
          presentationStyle={'pageSheet'}>
          <View
            style={{
              flex: 1,
              paddingTop: 100,
            }}>
            <Text>modal</Text>
            <Button
              title={'hide model'}
              onPress={() => {
                StatusBar.setBarStyle('dark-content');
                this.setState({showModal: false});
              }}></Button>
          </View>
        </Modal>

        <Button
          title={'show modal'}
          onPress={() => {
            StatusBar.setBarStyle('light-content');
            this.setState({showModal: true});
          }}></Button>

        <Text>routeDest</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => (routeDest = text)}
        />
        <Text>---</Text>
        <Text>dayTimeId</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => (dayTimeId = text)}
        />
        <Text>---</Text>
        <Text>('1', 'MORNING');</Text>
        <Text>('2', 'FORENOON');</Text>
        <Text>('3', 'MIDDAY');</Text>
        <Text>('4', 'AFTERNOON');</Text>
        <Text>('5', 'EVENING');</Text>
        <Text>('6', 'NIGHT');</Text>
        <Button
          title={'Safe'}
          onPress={() =>
            this.createEntry(routeDest, Number(dayTimeId))
          }></Button>
      </View>
    );
  }

  createEntry(routeDest: string, dayTimeId: number) {
    this.apiService.createEntry(
      this.props.startDate,
      this.props.endDate,
      this.props.startMileage,
      this.props.endMileage,
      routeDest,
      '',
      'carid',
      1,
      dayTimeId,
      'comid',
      () => {
        // do some stuff
      },
    );
  }
}

export default AppContext(CreateEntry);
