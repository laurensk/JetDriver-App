import {ApiRequest} from './ApiRequest';
import {ApiError} from './ApiError.model';
import {User} from '../models/User';
import {Account} from '../models/Account';
import {AccountUtils} from '../utils/AccountUtils';

export class ApiService {
  static async signUp(
    name: string,
    email: string,
    password: string,
    callback: Function,
  ) {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    ApiRequest.authRequest(
      'sign-up',
      data,
      async (user: User, error: ApiError, token: string) => {
        if (user && token) {
          await AccountUtils.setUser(user.uuid, user.email, user.name, token);
          callback(user, error);
        } else {
          callback(user, error);
        }
      },
    );
  }

  static async login(email: string, password: string, callback: Function) {
    const data = {
      email: email,
      password: password,
    };
    ApiRequest.authRequest(
      'login',
      data,
      async (user: User, error: ApiError, token: string) => {
        if (user && token) {
          await AccountUtils.setUser(user.uuid, user.email, user.name, token);
          callback(user, error);
        } else {
          callback(user, error);
        }
      },
    );
  }

  static postStuff(name: string, email: string, password: string) {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    ApiRequest.post(
      '/user/sign-up',
      data,
      User,
      false,
      (user: User, error: ApiError) => {
        console.log(user.uuid, error);
      },
    );
  }
}
