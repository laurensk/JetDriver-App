import React from 'react';
import {View, Text, ColorSchemeName, StyleSheet} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import ScrollViewBackSwipe from '../toolbox/ScrollViewBackSwipe';
import AppContext from '../utils/AppContext';

interface PropsType {
  navigation: NavigationScreenProp<any, any>;
  theme: {[k: string]: string};
  colorScheme: ColorSchemeName;
}

interface StateType {}

class About extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {theme, colorScheme, navigation} = this.props;

    const textStyle = StyleSheet.create({
      header: {
        color: this.props.colorScheme == 'dark' ? 'white' : undefined,
        fontWeight: '600',
        fontSize: 28,
        paddingBottom: 10,
      },
      subheading: {
        color: this.props.colorScheme == 'dark' ? 'white' : undefined,
        fontWeight: '600',
        fontSize: 20,
        paddingBottom: 5,
      },
      body: {
        color: this.props.colorScheme == 'dark' ? 'white' : undefined,
        paddingBottom: 25,
      },
    });

    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
        <ScrollViewBackSwipe>
          <View style={{padding: 40}}>
            <Text style={textStyle.header}>Über JetDriver</Text>
            <Text style={textStyle.body}>
              JetDriver ist das perfekte Fahrtenbuch für die L17-Ausbildung. Du kannst verschiedene Autos und
              Begleitpersonon anlegen, um diese mit deinen Fahrtenbucheinträgen zu verlinken. In der smarten
              Fahrtenansicht kannst du deine Gesamtkilometer jederzeit einsehen und gegebenenfalls einen Termin zu einer
              Überprüfungsfahrt vereinbaren.
            </Text>
            <Text style={textStyle.subheading}>Motivierter ans Autofahren</Text>
            <Text style={textStyle.body}>
              Mit der QuickDrive-Funktion fällt das lästige Eintragen in die Kilometerliste im Auto weg. Starte einfach
              eine Fahrt, indem du den aktuellen Kilometerstand deines Fahrzeugs eingibst. Wenn du deine Fahrt beendet
              hast, gib erneut den aktuellen Kilometerstand ein. JetDriver berechnet automatisch die gefahrenen
              Kilometer und trägt das Start- und Enddatum ein.
            </Text>
            <Text style={textStyle.subheading}>Deine Daten, dein Konto</Text>
            <Text style={textStyle.body}>
              JetDriver synchronisiert dein Fahrtenbuch mit der Cloud, damit JetDriver auf all deinen Geräten nutzbar
              ist. Zusätzlich dazu kannst du vertrauten Personen Zugriff auf deinen Account geben, um weitere
              Möglichkeiten zum Eintragen in dein Fahrtenbuch zu erhalten.
            </Text>
            <Text style={textStyle.subheading}>Ehrliches Fahrtenbuch</Text>
            <Text style={textStyle.body}>
              Um dein Fahrtenbuch so ehrlich wie möglich zu halten, kannst du Einträge im Nachhinein nicht bearbeiten,
              sondern nur neu erstellen, falls du Änderungen vornehmen möchtest. So wird JetDriver zu einem ehrlicherem
              Fahrtenbuch, welches viel mehr Vertrauen als ein herkömmliches Protokoll verdient hat.
            </Text>
            <Text style={textStyle.subheading}>Vertrauen in JetDriver</Text>
            <Text style={textStyle.body}>
              Um unseren Nutzerinnen und Nutzern noch mehr Vertrauen und Transparenz bieten zu können, entwicklen wir
              die App sowie das Backend als Open-Source Projekte und der komplette Code steht auf GitHub bereit.
            </Text>
          </View>
        </ScrollViewBackSwipe>
      </View>
    );
  }
}

export default AppContext(About);
