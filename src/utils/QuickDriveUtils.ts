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
    if (isNaN(startMileage)) {
      this.showQuickDriveError(this.quickDriveErrors.notANumber);
      return;
    }

    AsyncStorage.setItem('JD_QD_STARTDATE', Date());
    AsyncStorage.setItem('JD_QD_STARTMILEAGE', startMileage.toString());
    AsyncStorage.setItem('JD_QD_ENABLED', 'true');

    callback();
  }

  static async stopQuickDrive(callback: Function) {
    this.stopQuickDriveAlert((endMileage: number) => {
      if (isNaN(endMileage)) {
        this.showQuickDriveError(this.quickDriveErrors.notANumber);
        return;
      }
      this.stopQuickDriveData(
        endMileage,
        (startDate: Date, startMileage: number) => {
          callback(startDate, Date(), startMileage, endMileage);
        },
      );
    });
  }

  static async stopQuickDriveData(endMileage: number, callback: Function) {
    const startDate = await AsyncStorage.getItem('JD_QD_STARTDATE');
    const startMileage = Number(
      await AsyncStorage.getItem('JD_QD_STARTMILEAGE'),
    );

    console.log(startMileage, endMileage);
    if (startMileage > endMileage) {
      console.log('going in');
      this.showQuickDriveError(this.quickDriveErrors.lowerThanStart);
      return;
    }

    await AsyncStorage.removeItem('JD_QD_STARTDATE');
    await AsyncStorage.removeItem('JD_QD_STARTMILEAGE');
    await AsyncStorage.removeItem('JD_QD_ENABLED');
    callback(startDate, startMileage);
  }

  static async stopQuickDriveAlert(callback: Function) {
    Alert.prompt(
      'Fahrt beenden',
      'Bitte gib den aktuellen Kilometerstand deines Fahrzeugs ein.',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'Fahrt beenden',
          onPress: (endMileage) => callback(endMileage),
        },
      ],
      'plain-text',
      '',
      'phone-pad',
    );
  }

  static async showQuickDriveError(error: string) {
    Alert.alert('Ups!', `${error}`, [
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);
  }

  static quickDriveErrors = {
    notANumber: 'Bitte gib einen gültigen Kilometerstand ein.',
    lowerThanStart:
      'Bitte gib einen Kilometerstand ein, der größer als der ursprüngliche Kilometerstand ist.',
  };
}
