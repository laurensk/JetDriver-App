import React, {Component, ComponentClass} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  ColorSchemeName,
  Modal,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {ApiService} from '../api/ApiService';
import AppContext from '../utils/AppContext';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationTheme} from '../toolbox/NavigationTheme';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
  startMileage: number;
  startDate: Date;
  endMileage: number;
  endDate: Date;
}

interface StateType {
  showModal: boolean;
}

const ModalCustom = (props: any) => {
  const Stack = createNativeStackNavigator();

  const headerTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationHeaderTheme()
      : NavigationTheme.lightNavigationHeaderTheme();

  const headerTitleTheme =
    useColorScheme() === 'dark'
      ? NavigationTheme.darkNavigationTitleTheme()
      : NavigationTheme.lightNavigationTitleTheme();
  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      presentationStyle={'pageSheet'}>
      <Stack.Navigator>
        <Stack.Screen
          name={props.headerTitle}
          component={props.component}
          options={{
            headerStyle: headerTheme,
            headerTitleStyle: headerTitleTheme,
            headerLeft: () => (
              <Button
                title={props.headerCloseText}
                onPress={props.headerOnClose()}></Button>
            ),
          }}
        />
      </Stack.Navigator>
    </Modal>
  );
};

class CreateEntry extends React.Component<PropsType, StateType> {
  apiService = new ApiService();

  constructor(props: PropsType) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;
    const {startMileage, startDate, endMileage, endDate} = this.props;

    const carId = '7d05ef86-68de-4abf-96d0-a2090edbf707';
    const companionId = 'f0db7f18-65e6-4bdc-8b5b-cfcc804f50af';
    const roadConditionId = 1;

    let routeDest = '';
    let dayTimeId = '';

    const chooseCarModal = () => {
      return (
        <View>
          <Text>hallo</Text>
        </View>
      );
    };

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ModalCustom
          headerTitle="Auto auswählen"
          headerCloseText="Abbrechen"
          headerOnClose={this.setState({showModal: false})}
          component={chooseCarModal}
          visible={this.state.showModal}></ModalCustom>

        <Button
          title={'show modal'}
          onPress={() => {
            StatusBar.setBarStyle('light-content');
            this.setState({showModal: true});
          }}></Button>

        <Text>routeDest</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => (routeDest = text)}
        />
        <Text>---</Text>
        <Text>dayTimeId</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => (dayTimeId = text)}
        />
        <Text>---</Text>
        <Text>('1', 'MORNING');</Text>
        <Text>('2', 'FORENOON');</Text>
        <Text>('3', 'MIDDAY');</Text>
        <Text>('4', 'AFTERNOON');</Text>
        <Text>('5', 'EVENING');</Text>
        <Text>('6', 'NIGHT');</Text>
        <Button
          title={'Safe'}
          onPress={() =>
            this.createEntry(routeDest, Number(dayTimeId))
          }></Button>
      </View>
    );
  }

  createEntry(routeDest: string, dayTimeId: number) {
    this.apiService.createEntry(
      this.props.startDate,
      this.props.endDate,
      this.props.startMileage,
      this.props.endMileage,
      routeDest,
      '',
      'carid',
      1,
      dayTimeId,
      'comid',
      () => {
        // do some stuff
      },
    );
  }
}

export default AppContext(CreateEntry);
