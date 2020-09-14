import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RoadCondition} from '../models/RoadCondition';

interface PropsType {
  visible(visible: boolean): void;
  chooseRoadCondition(roadCondition: RoadCondition): void;
}

export const ChooseRoadCondition = (props: PropsType) => {
  return (
    <View style={{flex: 1}}>
      <Text>hallo</Text>
      <TouchableOpacity
        onPress={() => {
          //props.chooseCar();
          props.visible(false);
        }}>
        <Text>select car with id 6969-car-4204</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          //props.chooseCar();
          props.visible(false);
        }}>
        <Text>select car with id 1111-car-4444</Text>
      </TouchableOpacity>
    </View>
  );
};
