import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Car} from '../models/Car';

interface PropsType {
  visible: Function;
  chooseCar: Function;
}

export const ChooseCar = (props: PropsType) => {
  return (
    <View style={{flex: 1}}>
      <Text>hallo</Text>
      <TouchableOpacity
        onPress={() => {
          props.visible(false);
        }}>
        <Text>select car with id 1</Text>
      </TouchableOpacity>
    </View>
  );
};
