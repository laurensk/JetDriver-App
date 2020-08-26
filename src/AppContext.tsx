import React from 'react';
import {DefaultThemeContext, DarkThemeContext} from './Theme';
import {useColorScheme} from 'react-native';

export default (Component: any) => {
  return class AppContext extends React.Component {
    render() {
      // check colorscheme here and return specific themecontext
      return (
        <ThemeContext.Consumer>
          {(theme) => <Component {...this.props} theme={theme} />}
        </ThemeContext.Consumer>
      );
    }
  };
};
