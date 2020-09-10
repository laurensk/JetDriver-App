import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Car} from '../models/Car';
import {CarType} from '../models/CarType';

interface PropsType {
  visible(visible: boolean): void;
  chooseCar(car: Car): void;
}

export const ChooseCar = (props: PropsType) => {
  return (
    <View style={{flex: 1}}>
      <Text>hallo</Text>
      <TouchableOpacity
        onPress={() => {
          props.chooseCar(new Car('6969-car-4204', new CarType(1, 'test'), '', '', '', ''));
          props.visible(false);
        }}>
        <Text>select car with id 6969-car-4204</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.chooseCar(new Car('1111-car-4444', new CarType(1, 'test'), '', '', '', ''));
          props.visible(false);
        }}>
        <Text>select car with id 1111-car-4444</Text>
      </TouchableOpacity>
    </View>
  );
};
