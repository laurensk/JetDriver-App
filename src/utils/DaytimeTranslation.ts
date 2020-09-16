export class DaytimeTranslation {
  static translation: any = {
    MORNING: 'Morgens',
    FORENOON: 'Vormittags',
    MIDDAY: 'Mittags',
    AFTERNOON: 'Nachmittags',
    EVENING: 'Abends',
    NIGHT: 'Nachts',
  };

  static get(daytime: string) {
    return this.translation[daytime];
  }
}
