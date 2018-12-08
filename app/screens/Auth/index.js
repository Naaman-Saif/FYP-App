import { StackNavigator } from 'react-navigation';
import Login from './login';
import SignUp from './signup';
import AuthLoadingScreen from './AuthLoading';

export default StackNavigator({
    AuthLoading: {
        screen: AuthLoadingScreen,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            header: null
        }
    },
},
    {
        initialRouteName: 'AuthLoading',
    }
)