import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Note from './Note';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Notifications } from 'expo';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteArray: [],
      noteText: '',
      isDateTimePickerVisible: false,
    };
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = async date => {
    console.log('A time has been picked: ', date);
    console.log(date);
    const localNotification = {
      title: this.state.noteArray[this.state.noteArray.length - 1].note,
      body: this.state.noteArray[this.state.noteArray.length - 1].note,
      ios: {
        // (optional) (object) — notification configuration specific to iOS.
        sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      },
      // (optional) (object) — notification configuration specific to Android.
      android: {
        sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
        //icon (optional) (string) — URL of icon to display in notification drawer.
        //color (optional) (string) — color of the notification icon in notification drawer.
        priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
        sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
        vibrate: true, // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
        // link (optional) (string) — external link to open when notification is selected.
      },
    };
    const schedulingOptions = {
      time: date, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
    };
    // console.log(schedulingOptions);
    // console.log(this.state.noteArray[this.state.noteArray.length - 1].note);
    AsyncStorage.setItem('Notes', JSON.stringify(this.state.noteArray), (err, saved) => {
      if (err) {
        console.log(err);
      } else {
        console.log(saved);
      }
    });
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    this._hideDateTimePicker();
  };
  render() {
    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(key)} />;
    });

    return (
      <View style={styles.container}>
        <DateTimePicker
          mode="time"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          is24Hour={false}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>- REMINDER -</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>{notes}</ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder="> Note"
            placeholderTextColor="white"
            onChangeText={noteText => this.setState({ noteText })}
            value={this.state.noteText}
          />
        </View>

        <TouchableOpacity onPress={this.addNote} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  addNote = () => {
    if (this.state.noteText) {
      var d = new Date();

      this.state.noteArray.push({
        date: d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(),
        note: this.state.noteText,
      });
      this._showDateTimePicker();
      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: '' });
    }
  };

  deleteNote = async key => {
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray });
    await AsyncStorage.setItem('Notes', JSON.stringify(this.state.noteArray));
  };
  componentWillMount = async () => {
    AsyncStorage.getItem('Notes', (err, notes) => {
      if (err) {
        console.log(err);
      } else if (notes == null) {
        this.setState({
          noteArray: [],
        });
      } else {
        notes = JSON.parse(notes);
        this.setState({
          noteArray: notes,
        });
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  addButton: {
    position: 'absolute',
    // position it anywhere
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#27ae60',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});
