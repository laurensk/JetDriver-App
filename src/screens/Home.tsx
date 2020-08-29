import React from 'react';
import {View, ColorSchemeName, Image, Text, Button} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface PropsType {
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
  navigation: NavigationScreenProp<any, any>;
}

interface StateType {}

class Home extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/jetdriver_logo.png')}
          resizeMode={'contain'}
          style={{width: 250, height: 100}}></Image>
        <View>
          <Text>Gute Fahrt, Laurens</Text>
        </View>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: 'lightblue',
              height: 50,
              flexDirection: 'row',
            }}>
            <Text>🚘 </Text>
            <Text>Fahrt eintragen</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: 'lightblue',
              height: 50,
              flexDirection: 'row',
            }}>
            <Text>🚘 </Text>
            <Text>Fahrtenprotokoll anzeigen</Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: 'lightblue',
                height: 50,
                flexDirection: 'row',
              }}>
              <Text>🚘 </Text>
              <Text>Autos verwalten</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: 'lightblue',
                height: 50,
                flexDirection: 'row',
              }}>
              <Text>🚘 </Text>
              <Text>Begleiter verwalten</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text>Über JetDriver</Text>
          </TouchableOpacity>
          <Text>•</Text>
          <TouchableOpacity>
            <Text>Kontakt</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Abmelden</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AppContext(Home);
