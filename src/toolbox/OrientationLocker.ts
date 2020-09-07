import {Platform} from 'react-native';

import Orientation from 'react-native-orientation';

export class OrientationLocker {
  static async lock() {
    if (Platform.OS == 'ios' && !Platform.isPad) {
      Orientation.lockToPortrait();
    }
  }
}
