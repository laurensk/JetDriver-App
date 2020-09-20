import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default (props: any) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>{props.children}</ScrollView>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: 10,
          left: 0,
        }}
      />
    </View>
  );
};
