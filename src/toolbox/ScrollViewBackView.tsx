import React from 'react';
import {View} from 'react-native';

export default (props: any) => {
  return (
    <View style={{flex: 1}}>
      {props.children}
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: 25,
          left: 0,
        }}
      />
    </View>
  );
};
