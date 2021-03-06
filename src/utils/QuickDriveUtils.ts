import {Alert, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import prompt from 'react-native-prompt-android';

export class QuickDriveUtils {
  static async checkForQuickDrive() {
    const quickDrive = await AsyncStorage.getItem('JD_QD_ENABLED');
    return quickDrive == 'true';
  }

  static async startQuickDrive(callback: Function) {
    Platform.OS == 'ios'
      ? this.startQuickDriveAlertIos((startMileage: number) => {
          this.startQuickDriveData(startMileage, () => {
            callback();
          });
        })
      : this.startQuickDriveAlertAndroid((startMileage: number) => {
          this.startQuickDriveData(startMileage, () => {
            callback();
          });
        });
  }

  static async startQuickDriveAlertIos(callback: Function) {
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
      'phone-pad'
    );
  }

  static async startQuickDriveAlertAndroid(callback: Function) {
    prompt(
      'Fahrt starten',
      'Bitte gib den aktuellen Kilometerstand deines Fahrzeugs ein.',
      [{text: 'Abbrechen'}, {text: 'Fahrt starten', onPress: (startMileage) => callback(startMileage)}],
      {
        type: 'plain-text',
        cancelable: true,
      }
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
    Platform.OS == 'ios'
      ? this.stopQuickDriveAlertIos((endMileage: number) => {
          if (isNaN(endMileage)) {
            this.showQuickDriveError(this.quickDriveErrors.notANumber);
            return;
          }
          this.stopQuickDriveData(endMileage, (startDate: Date, startMileage: number) => {
            callback(startDate, Date(), startMileage, endMileage);
          });
        })
      : this.stopQuickDriveAlertAndroid((endMileage: number) => {
          if (isNaN(endMileage)) {
            this.showQuickDriveError(this.quickDriveErrors.notANumber);
            return;
          }
          this.stopQuickDriveData(endMileage, (startDate: Date, startMileage: number) => {
            callback(startDate, Date(), startMileage, endMileage);
          });
        });
  }

  static async stopQuickDriveData(endMileage: number, callback: Function) {
    const startDate = await AsyncStorage.getItem('JD_QD_STARTDATE');
    const startMileage = Number(await AsyncStorage.getItem('JD_QD_STARTMILEAGE'));

    if (startMileage > endMileage) {
      this.showQuickDriveError(this.quickDriveErrors.lowerThanStart);
      return;
    }

    await AsyncStorage.removeItem('JD_QD_STARTDATE');
    await AsyncStorage.removeItem('JD_QD_STARTMILEAGE');
    await AsyncStorage.removeItem('JD_QD_ENABLED');
    callback(startDate, startMileage);
  }

  static async stopQuickDriveAlertIos(callback: Function) {
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
      'phone-pad'
    );
  }

  static async stopQuickDriveAlertAndroid(callback: Function) {
    prompt(
      'Fahrt beenden',
      'Bitte gib den aktuellen Kilometerstand deines Fahrzeugs ein.',
      [{text: 'Abbrechen'}, {text: 'Fahrt beenden', onPress: (endMileage) => callback(endMileage)}],
      {
        type: 'plain-text',
        cancelable: true,
      }
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
    lowerThanStart: 'Bitte gib einen Kilometerstand ein, der größer als der ursprüngliche Kilometerstand ist.',
  };
}
