import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, BackHandler, ImageBackground,Alert } from 'react-native';
import { Bubbles } from 'react-native-loader';
import axios from 'axios';
import apiBaseURL from '../../utils/apiBaseURL';

export default class LoginComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            load:0
        }
    }
    async componentDidMount() {
        BackHandler.addEventListener('hadrwareBackPress', this.handleBackHandler);
    }
    handleBackHandler() {
        BackHandler.exitApp();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hadrwareBackPress', this.handleBackHandler);

    }
    onChangeUser = (value) => {
        this.setState({
            username: value
        })
    }
    onChangePassword = (value) => {
        this.setState({
            password: value
        })
    }
    onChangePasswordAgain = (value) => {
        this.setState({
            repeatPassword: value
        });
    }
    onSubmit = () => {
        const navigation = this.props.navigation;
        if (this.state.password == this.state.repeatPassword) {
            const user = {
                username: this.state.username,
                password: this.state.password
            }
            this.setState({
                load: 1
            })
            axios.post(apiBaseURL + '/api/signup', user)
                .then((res) => {
                    Alert.alert("Registered!!");
                    navigation.navigate("Login");
                })
                .catch((err) => {
                    console.log(err);
                })
                .then(() => {
                    this.setState({
                        load: 0
                    })
                })
        }else{
            Alert.alert("Passwords don't match");
            this.setState({
                password:'',
                repeatPassword:''
            })
        }
    }
    render() {
        const { navigate } = this.props.navigation;

        return ((this.state.load == 0 ? <ImageBackground source={require('../../assets/images/AuthBackground.png')} style={{ width: "100%", height: "100%" }}><View style={styles.container}>
            <Image style={{ height: 75, width: 60 }} source={require('../../assets/images/github-octocat.png')}></Image>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 70, borderBottomWidth: 1 }}>
                <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.loginInput} placeholder='Username' onChangeText={this.onChangeUser} placeholderTextColor="#8f98a9" />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1 }}>
                <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.signUpInput} placeholder='Password' placeholderTextColor="#8f98a9" secureTextEntry={true} onChangeText={this.onChangePassword} />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1 }}>
                <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.signUpInput} placeholder='Repeat Password' placeholderTextColor="#8f98a9" secureTextEntry={true} onChangeText={this.onChangePasswordAgain} />
            </View>
            <View>
                <TouchableOpacity style={styles.signUp} onPress={this.onSubmit}><Text style={styles.signUpText}>Signup!</Text></TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 50, marginLeft: 40 }} onPress={() => navigate("Login")}><Text style={{ color: "#27ae60" }}>Have an Account already?</Text></TouchableOpacity>
            </View>
        </View></ImageBackground > : <ImageBackground source={require('../../assets/images/AuthBackground.png')} style={{ width: "100%", height: "100%" }}><View style={styles.container}><Bubbles size={10} color="#27ae60" /></View></ImageBackground>));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    header: {
        marginTop: "15%"
    },
    head: {
        fontSize: 40,
        color: "#000",
        marginBottom: 20
    },
    signUp: {
        width: 250,
        height: 50,
        borderRadius: 50,
        marginTop: 30,
        backgroundColor: "#27ae60",
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'Roboto'
    },
    loginInput: {
        width: 250,
        fontSize: 20,
        fontFamily: 'Roboto'
    },
    signUpPage: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#FFF",
        backgroundColor: "#FFF",
        alignItems: 'center'
    },
    signUpInput: {
        width: 250,
        fontSize: 20,
        marginTop: 10
    },
});