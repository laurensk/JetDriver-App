import React from 'react';
import {View, ColorSchemeName, Image, Text} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import AppContext from '../utils/AppContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Icon} from 'react-native-elements';

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
          style={{width: 250, height: 150}}></Image>
        <View style={{paddingTop: 100}}></View>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: '#2089DC',
              fontFamily: 'Arial Rounded MT Bold',
            }}>
            Gute Fahrt, Laurens Kropf
          </Text>
        </View>
        <View style={{paddingTop: 25}}></View>
        <View style={{flexDirection: 'row'}}>
          <Button
            style={{paddingHorizontal: 3}}
            buttonStyle={{width: 190, height: 50}}
            icon={
              <Icon
                style={{paddingRight: 10}}
                name="database-plus"
                type="material-community"
                size={25}
                color="white"
              />
            }
            title="Eintragen"
          />
          <Button
            style={{paddingHorizontal: 3}}
            buttonStyle={{width: 190, height: 50}}
            icon={
              <Icon
                style={{paddingRight: 10}}
                name="car"
                type="material-community"
                size={25}
                color="white"
              />
            }
            title="Fahrt starten"
          />
        </View>
        <Button
          type="outline"
          style={{paddingTop: 10, paddingHorizontal: 3}}
          buttonStyle={{width: 386, height: 50}}
          icon={
            <Icon
              style={{paddingRight: 10}}
              name="format-list-bulleted"
              type="material-community"
              size={25}
              color="#2089DC"
            />
          }
          title="Fahrtenprotoll anzeigen"
        />
        <View style={{flexDirection: 'row', paddingTop: 10}}>
          <Button
            type="outline"
            style={{paddingHorizontal: 3}}
            buttonStyle={{width: 190, height: 50}}
            icon={
              <Icon
                style={{paddingRight: 10}}
                name="car"
                type="material-community"
                size={25}
                color="#2089DC"
              />
            }
            title="Autos"
          />
          <Button
            type="outline"
            style={{paddingHorizontal: 3}}
            buttonStyle={{width: 190, height: 50}}
            icon={
              <Icon
                style={{paddingRight: 10}}
                name="account-group"
                type="material-community"
                size={25}
                color="#2089DC"
              />
            }
            title="Begleiter"
          />
        </View>
        <View style={{paddingTop: 100}}></View>
        <View style={{flexDirection: 'row'}}>
          <Button title="Über JetDriver" type="clear" />
          <Button title="Kontakt" type="clear" />
        </View>
        <Button
          title="Abmelden"
          type="clear"
          titleStyle={{fontWeight: '600'}}
        />
      </View>
    );
  }
}

export default AppContext(Home);
