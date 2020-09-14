import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Daytime} from '../models/Daytime';

interface PropsType {
  visible(visible: boolean): void;
  chooseDaytime(daytime: Daytime): void;
}

export const ChooseDaytime = (props: PropsType) => {
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
