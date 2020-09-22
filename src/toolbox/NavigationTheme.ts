import {Platform} from 'react-native';

export class NavigationTheme {
  static lightNavigationHeaderTheme() {
    return Platform.OS != 'ios'
      ? undefined
      : {
          backgroundColor: '#FAFBFB',
          borderColor: '#BCBCC0',
          borderBottomWidth: 0.4,
        };
  }

  static darkNavigationHeaderTheme() {
    return Platform.OS != 'ios'
      ? {
          backgroundColor: '#121212',
        }
      : {
          backgroundColor: '#121212',
          borderBottomColor: '#1A1B1B', // #202020 #1A1B1B
          borderBottomWidth: 0.4,
          shadowOpacity: 0.3,
        };
  }

  static lightNavigationTitleTheme() {
    return Platform.OS != 'ios'
      ? undefined
      : {
          color: '#000000',
        };
  }

  static darkNavigationTitleTheme() {
    return Platform.OS != 'ios'
      ? {
          color: 'white',
        }
      : {
          color: '#FFFFFF',
        };
  }
}
