import {Platform} from 'react-native';

export const lightNavigationHeaderStyle = () => {
  return Platform.OS != 'ios'
    ? undefined
    : {
        backgroundColor: '#FAFBFB',
        borderColor: '#BCBCC0',
        borderBottomWidth: 0.4,
      };
};

export const darkNavigationHeaderStyle = () => {
  return Platform.OS != 'ios'
    ? undefined
    : {
        backgroundColor: '#121212',
        borderBottomColor: '#000000', // #202020 #1A1B1B
        borderBottomWidth: undefined,
      };
};

export const lightNavigationTitleStyle = () => {
  return Platform.OS != 'ios'
    ? undefined
    : {
        color: '#000000',
      };
};

export const darkNavigationTitleStyle = () => {
  return Platform.OS != 'ios'
    ? undefined
    : {
        color: '#FFFFFF',
      };
};
