import {CarType} from './CarType';

export class Car {
  uuid: string;
  carType: CarType;
  numberPlate: string;
  name: string;
  brand: string;
  model: string;

  constructor(uuid: string, carType: CarType, numberPlate: string, name: string, brand: string, model: string) {
    this.uuid = uuid;
    this.carType = carType;
    this.numberPlate = numberPlate;
    this.name = name;
    this.brand = brand;
    this.model = model;
  }
}
