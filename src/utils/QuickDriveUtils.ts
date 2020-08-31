import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export class QuickDriveUtils {
  static async checkForQuickDrive() {
    const quickDrive = await AsyncStorage.getItem('JD_QD_ENABLED');
    return quickDrive == 'true';
  }

  static async startQuickDrive(callback: Function) {
    this.startQuickDriveAlert((startMileage: number) => {
      this.startQuickDriveData(startMileage, () => {
        callback();
      });
    });
  }

  static async startQuickDriveAlert(callback: Function) {
    Alert.prompt(
      'Fahrt starten',
      'Bitte gib den aktuellen Kilometerstand deines Fahrzeugs ein.',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'Fahrt starten',
          onPress: (startMileage) => callback(startMileage),
        },
      ],
      'plain-text',
      '',
      'phone-pad',
    );
  }
  static async startQuickDriveData(startMileage: number, callback: Function) {
    console.log('fahren bei ' + startMileage + ' km.');
  }

  static async stopQuickDrive(endDate: Date, endMileage: number) {}
}
