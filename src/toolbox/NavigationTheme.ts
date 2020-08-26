import {Platform} from 'react-native';

export const lightNavigationHeaderTheme = () => {
  return Platform.OS != 'ios'
    ? undefined
    : {
        backgroundColor: '#FAFBFB',
        borderColor: '#BCBCC0',
        borderBottomWidth: 0.4,
      };
};

export const darkNavigationHeaderTheme = () => {
  return Platform.OS != 'ios'
    ? undefined
    : {
        backgroundColor: '#121212',
        borderBottomColor: '#000000', // #202020 #1A1B1B
        borderBottomWidth: undefined,
      };
};

export const lightNavigationTitleTheme = () => {
  return Platform.OS != 'ios'
    ? undefined
    : {
        color: '#000000',
      };
};

export const darkNavigationTitleTheme = () => {
  return Platform.OS != 'ios'
    ? undefined
    : {
        color: '#FFFFFF',
      };
};
