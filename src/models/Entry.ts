import {User} from './User';
import {Companion} from './Companion';
import {RoadCondition} from './RoadCondition';
import {Car} from './Car';
import {Daytime} from './Daytime';

export class Entry {
  uuid: string;
  startDate: number;
  endDate: number;
  startMileage: number;
  endMileage: number;
  routeDest: string;
  notes: string;
  car: Car;
  roadCondition: RoadCondition;
  daytimeId: Daytime;
  companion: Companion;
  user: User;

  constructor(
    uuid: string,
    startDate: number,
    endDate: number,
    startMileage: number,
    endMileage: number,
    routeDest: string,
    notes: string,
    car: Car,
    roadCondition: RoadCondition,
    daytimeId: Daytime,
    companion: Companion,
    user: User
  ) {
    this.uuid = uuid;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startMileage = startMileage;
    this.endMileage = endMileage;
    this.routeDest = routeDest;
    this.notes = notes;
    this.car = car;
    this.roadCondition = roadCondition;
    this.daytimeId = daytimeId;
    this.companion = companion;
    this.user = user;
  }
}
