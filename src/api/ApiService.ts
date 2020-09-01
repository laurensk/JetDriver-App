import {AccountUtils} from '../utils/AccountUtils';

export class ApiService {
  account = AccountUtils.getUser();

  createEntry(
    startDate: Date,
    endDate: Date,
    startMileage: number,
    endMileage: number,
    routeDest: string,
    notes: string,
    carId: string,
    roadConditionId: number,
    dayTimeId: number,
    companionId: string,
    callback: Function,
  ) {}
}
