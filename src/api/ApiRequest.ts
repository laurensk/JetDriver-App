import Axios, {AxiosResponse} from 'axios';
import {AccountUtils} from '../utils/AccountUtils';
import {ApiError} from './ApiError.model';
import {User} from '../models/User';
import {ApiDeletion} from './ApiDeletion.model';

export class ApiRequest {
  static apiEndpoint: string = 'https://api.jetdriver.laurensk.at';

  static async responseHandler(response: AxiosResponse<any>, parseType: any, isArray: boolean, callback: Function) {
    const rawData = Object.values(response.data)[0];
    const data = isArray ? (rawData as typeof parseType) : (rawData as typeof parseType[]);
    callback(data, null);
  }

  static async errorHandler(error: any, callback: Function) {
    if (!error || !error.response || !error.response.data) return callback(null, new ApiError('UNKNOWN_ERROR', 400));
    if (error.response.data.error.message != undefined) {
      const statusCode: number = error.response.data.error.statusCode;
      const message: string = error.response.data.error.message;
      const apiError = new ApiError(message, statusCode);
      return callback(null, apiError);
    } else {
      const apiError = new ApiError('UNKNOWN_ERROR', 400);
      return callback(null, apiError);
    }
  }

  static async getHeader() {
    const account = await AccountUtils.getUser();
    return {
      headers: {Authorization: `Bearer ${account?.token}`},
    };
  }

  static async get(path: string, parseType: any, isArray: boolean, callback: Function, header?: object) {
    const reqUrl = this.apiEndpoint + path;
    const reqHeader = header || (await this.getHeader());
    Axios.get(reqUrl, reqHeader)
      .then((res) => this.responseHandler(res, parseType, isArray, callback))
      .catch((err) => this.errorHandler(err, callback));
  }

  static async post(
    path: string,
    postData: object,
    parseType: any,
    isArray: boolean,
    callback: Function,
    header?: object
  ) {
    const reqUrl = this.apiEndpoint + path;
    const reqHeader = header || (await this.getHeader());
    Axios.post(reqUrl, postData, reqHeader)
      .then((res) => this.responseHandler(res, parseType, isArray, callback))
      .catch((err) => this.errorHandler(err, callback));
  }

  static async delete(path: string, callback: Function, header?: object) {
    const reqUrl = this.apiEndpoint + path;
    const reqHeader = header || (await this.getHeader());
    Axios.delete(reqUrl, reqHeader)
      .then((res) => this.responseHandler(res, ApiDeletion, false, callback))
      .catch((err) => this.errorHandler(err, callback));
  }

  static async authRequest(action: string, data: object, callback: Function) {
    const reqUrl = this.apiEndpoint + '/user/' + action;
    Axios.post(reqUrl, data)
      .then((res) => {
        const user = Object.values(res.data)[0] as User;
        const token = res.headers['auth-token'];
        callback(user, null, token);
      })
      .catch((err) => this.errorHandler(err, callback));
  }
}
