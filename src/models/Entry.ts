import {User} from './User';
import {Companion} from './Companion';
import {RoadCondition} from './RoadCondition';
import {Car} from './Car';

export class Entry {
  uuid: string;
  date: Date;
  startMileage: number;
  endMileage: number;
  routeDest: string;
  notes: string;
  car: Car;
  roadCondition: RoadCondition;
  companion: Companion;
  user: User;

  constructor(
    uuid: string,
    date: Date,
    startMileage: number,
    endMileage: number,
    routeDest: string,
    notes: string,
    car: Car,
    roadCondition: RoadCondition,
    companion: Companion,
    user: User,
  ) {
    this.uuid = uuid;
    this.date = date;
    this.startMileage = startMileage;
    this.endMileage = endMileage;
    this.routeDest = routeDest;
    this.notes = notes;
    this.car = car;
    this.roadCondition = roadCondition;
    this.companion = companion;
    this.user = user;
  }
}
