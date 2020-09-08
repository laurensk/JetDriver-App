import {Alert} from 'react-native';

export class ErrorAlert {
  static present(error: string) {
    Alert.alert('Ups!', error, [
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);
  }
}
