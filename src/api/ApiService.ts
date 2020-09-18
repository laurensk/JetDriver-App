import {ApiRequest} from './ApiRequest';
import {ApiError} from './ApiError.model';
import {User} from '../models/User';
import {AccountUtils} from '../utils/AccountUtils';
import {Car} from '../models/Car';
import {RoadCondition} from '../models/RoadCondition';
import {Companion} from '../models/Companion';
import {Daytime} from '../models/Daytime';
import {Entry} from '../models/Entry';

export class ApiService {
  static async signUp(name: string, email: string, password: string, callback: Function) {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    ApiRequest.authRequest('sign-up', data, async (user: User, error: ApiError, token: string) => {
      if (user && token) {
        await AccountUtils.setUser(user.uuid, user.email, user.name, token);
        callback(user, error);
      } else {
        callback(user, error);
      }
    });
  }

  static async login(email: string, password: string, callback: Function) {
    const data = {
      email: email,
      password: password,
    };
    ApiRequest.authRequest('login', data, async (user: User, error: ApiError, token: string) => {
      if (user && token) {
        await AccountUtils.setUser(user.uuid, user.email, user.name, token);
        callback(user, error);
      } else {
        callback(user, error);
      }
    });
  }

  static getRoadConditions(callback: Function) {
    ApiRequest.get(
      '/properties/roadConditions',
      RoadCondition,
      true,
      async (roadConditions: RoadCondition[], error: ApiError) => {
        callback(roadConditions, error);
      }
    );
  }

  static getCars(callback: Function) {
    ApiRequest.get('/cars', Car, true, async (cars: Car[], error: ApiError) => {
      callback(cars, error);
    });
  }

  static getCompanions(callback: Function) {
    ApiRequest.get('/companions', Companion, true, async (companions: Companion[], error: ApiError) => {
      callback(companions, error);
    });
  }

  static getDaytimes(callback: Function) {
    ApiRequest.get('/properties/daytimes', Daytime, true, async (daytimes: Daytime[], error: ApiError) => {
      callback(daytimes, error);
    });
  }

  static createEntry(
    startDate: Number,
    endDate: Number,
    startMileage: Number,
    endMileage: Number,
    routeDest: String,
    roadConditionId: Number,
    carUuid: String,
    companionUuid: String,
    daytimeId: Number,
    callback: Function
  ) {
    const data = {
      startDate: startDate,
      endDate: endDate,
      startMileage: startMileage,
      endMileage: endMileage,
      routeDest: routeDest,
      roadConditionId: roadConditionId,
      carId: carUuid,
      companionId: companionUuid,
      daytimeId: daytimeId,
    };
    ApiRequest.post('/entries', data, Entry, false, (entry: Entry, error: ApiError) => {
      callback(entry, error);
    });
  }
}
