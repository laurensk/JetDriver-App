import {StatusBar} from 'react-native';

export class ModalSheetUtils {
  static showModal(callback: Function) {
    StatusBar.setBarStyle('light-content');
    callback();
  }

  static dismissModal(callback: Function) {
    StatusBar.setBarStyle('default');
    callback();
  }
}
