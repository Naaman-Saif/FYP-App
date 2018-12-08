import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  ImageBackground,
  CheckBox,
  AsyncStorage,
} from 'react-native';
import { Bubbles } from 'react-native-loader';
import { Facebook } from 'expo';
import firebase from 'firebase';
import { fbappid, firebaseConfig } from './auth';
import axios from 'axios';
import apiBaseURL from '../../utils/apiBaseURL';
import screens from '../../constants/screens';

export default class LoginComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      load: 0,
      remember: false,
    };
  }
  async componentDidMount() {
    BackHandler.addEventListener('hadrwareBackPress', this.handleBackHandler);
  }
  handleFacebook = async () => {
    this.setState({
      load: 1,
    });
    const { navigation } = this.props;
    console.log(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    console.log('facebook_Actions.js:line17:fbappid');
    console.log(fbappid);

    let { type, token } = await Facebook.logInWithReadPermissionsAsync(fbappid, {
      permissions: ['public_profile', 'email'],
    });

    console.log('---credential---');
    console.log(credential);
    if (type === 'cancel') {
      console.log('Facebook Login Failed');
    }

    var credential = firebase.auth.FacebookAuthProvider.credential(token);

    console.log('---token---');
    console.log(token);

    try {
      let user = await firebase.auth().signInWithCredential(credential);
      const saveUser = await AsyncStorage.setItem('User', JSON.stringify(user));
      navigation.navigate(screens.DrawerRoot);
      let emailcheck = await firebase
        .database()
        .ref(`/users/${user.uid}/userDetails/email`)
        .once('value');
      var emailcheckflag = emailcheck.val();

      if (emailcheckflag) {
        // update user properties to firebase
        firebase
          .database()
          .ref(`/users/${user.uid}/userDetails`)
          .update({
            fbEmail: user.email,
            fbDisplayName: user.displayName,
            fbPhotoURL: user.photoURL,
          });
      }
    } catch (error) {
      console.log('fb_actions.js:line57:error');
      console.log(error);
    }
    // await AsyncStorage.setItem('fb_token', token);
    if (emailcheckflag) {
      console.log(token);
    } else {
      // case where the user has signed in without signing up.
      await firebase.auth().signOut();
    }
  };
  handleBackHandler() {
    BackHandler.exitApp();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hadrwareBackPress', this.handleBackHandler);
  }
  onChangeUser = value => {
    this.setState({
      username: value,
    });
  };
  onChangePassword = value => {
    this.setState({
      password: value,
    });
  };
  onSubmit = () => {
    const navigation = this.props.navigation;
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    this.setState({
      load: 1,
    });
    axios
      .post(apiBaseURL + '/api/login', user)
      .then(async res => {
        const saveUser = await AsyncStorage.setItem('User', JSON.stringify(res.data));
        const origUser = res.data;
        if (origUser.firstTime) {
          navigation.navigate(screens.OnBoarding);
        } else {
          navigation.navigate(screens.DrawerRoot);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.setState({
          load: 0,
        });
      });
  };
  render() {
    const { navigate } = this.props.navigation;

    return this.state.load == 0 ? (
      <ImageBackground
        source={require('../../assets/images/AuthBackground.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>
          <Image
            style={{ height: 75, width: 60 }}
            source={require('../../assets/images/github-octocat.png')}
          />
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 70, borderBottomWidth: 1 }}
          >
            <TextInput
              underlineColorAndroid="rgba(0,0,0,0)"
              style={styles.loginInput}
              placeholder="Username"
              onChangeText={this.onChangeUser}
              placeholderTextColor="#8f98a9"
            />
          </View>
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, borderBottomWidth: 1 }}
          >
            <TextInput
              underlineColorAndroid="rgba(0,0,0,0)"
              style={styles.loginInput}
              placeholder="Password"
              placeholderTextColor="#8f98a9"
              onChangeText={this.onChangePassword}
              onSubmitEditing={this.onSubmit}
              secureTextEntry={true}
            />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
            <CheckBox
              style={{ marginLeft: '14%' }}
              value={this.state.remember}
              onValueChange={() => this.setState({ remember: !this.state.remember })}
            />
            <Text style={{ marginTop: '2%', flex: 5, color: '#8f98a9' }}>Remember Me</Text>
            <TouchableOpacity style={{ flex: 7, marginTop: '2%' }}>
              <Text style={{ color: '#8f98a9' }}>Forgot Password? </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.signUp} onPress={this.onSubmit}>
              <Text style={styles.signUpText}>Login!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUp} onPress={this.handleFacebook}>
              <Image
                source={require('../../assets/images/54261.png')}
                style={{ width: 20, height: 20, marginTop: 5 }}
              />
              <Text style={styles.signUpFBText}>Login With Facebook!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 50, marginLeft: 40 }}
              onPress={() => navigate('SignUp')}
            >
              <Text style={{ color: '#27ae60' }}>Need to register an Account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    ) : (
      <ImageBackground
        source={require('../../assets/images/AuthBackground.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>
          <Bubbles size={10} color="#27ae60" />
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  header: {
    marginTop: '15%',
  },
  head: {
    fontSize: 40,
    color: '#000',
    marginBottom: 20,
  },
  signUp: {
    width: 250,
    height: 50,
    borderRadius: 50,
    marginTop: 30,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Roboto',
  },
  signUpFBText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Roboto',
    float: 'right',
  },
  loginInput: {
    width: 250,
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  signUpPage: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  signUpInput: {
    width: 250,
    fontSize: 20,
    marginTop: 10,
  },
});
