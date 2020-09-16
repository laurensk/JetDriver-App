export class RoadConditionTranslation {
  static translation: any = {
    DRY: 'Trocken',
    WET: 'Nass',
    SNOW: 'Schnee',
    ICE: 'Eis',
  };

  static get(roadCondtion: string) {
    return this.translation[roadCondtion];
  }
}
