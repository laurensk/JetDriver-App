import {AsyncStorage} from 'react-native';
import {Account} from '../models/Account';

export class AccountUtils {
  async isLoggedIn() {
    const loggedIn = await AsyncStorage.getItem('JD_ACC_LOGGED_IN');
    return loggedIn == 'true';
  }

  async getUser() {
    if (!(await this.isLoggedIn())) return null;
    const uuid = (await AsyncStorage.getItem('JD_ACC_UUID')) || '';
    const email = (await AsyncStorage.getItem('JD_ACC_EMAIL')) || '';
    const name = (await AsyncStorage.getItem('JD_ACC_NAME')) || '';
    const token = (await AsyncStorage.getItem('JD_ACC_TOKEN')) || '';
    return new Account(uuid, email, name, token);
  }

  async setUser(uuid: string, email: string, name: string, token: string) {
    await AsyncStorage.setItem('JD_ACC_UUID', uuid);
    await AsyncStorage.setItem('JD_ACC_EMAIL', email);
    await AsyncStorage.setItem('JD_ACC_NAME', name);
    await AsyncStorage.setItem('JD_ACC_TOKEN', token);
    await AsyncStorage.setItem('JD_ACC_LOGGED_IN', 'true');
  }

  async removeUser() {
    await AsyncStorage.removeItem('JD_ACC_UUID');
    await AsyncStorage.removeItem('JD_ACC_EMAIL');
    await AsyncStorage.removeItem('JD_ACC_NAME');
    await AsyncStorage.removeItem('JD_ACC_TOKEN');
    await AsyncStorage.removeItem('JD_ACC_LOGGED_IN');
  }
}
