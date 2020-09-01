import React from 'react';
import {View, TextInput, Text, Button} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {ApiService} from '../api/ApiService';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  startMileage: number;
  startDate: Date;
  endMileage: number;
  endDate: Date;
}

interface StateType {}

class CreateEntry extends React.Component<PropsType, StateType> {
  apiService = new ApiService();

  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {startMileage, startDate, endMileage, endDate} = this.props;

    const carId = '7d05ef86-68de-4abf-96d0-a2090edbf707';
    const companionId = 'f0db7f18-65e6-4bdc-8b5b-cfcc804f50af';
    const roadConditionId = 1;

    let dayTimeId = '';
    let routeDest = '';

    return (
      <View>
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
        <Button title={'Safe'} onPress={() => {}}></Button>
      </View>
    );
  }

  createEntry() {
    this.apiService.createEntry(stuff, () => {
      // do some stuff
    });
  }
}

export default CreateEntry;
