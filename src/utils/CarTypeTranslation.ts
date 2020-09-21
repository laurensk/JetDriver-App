export class CarTypeTranslation {
  static translation: any = {
    MANUAL: 'Schaltgetriebe',
    AUTOMATIC: 'Automatikgetriebe',
  };

  static get(carType: string) {
    return this.translation[carType];
  }
}
