import { StackNavigator } from 'react-navigation';
import screens from '../constants/screens';
import { OnBoarding,Auth } from '../screens';
import NavigatorDrawer from './NavigatorDrawer';

const routes = {
  [screens.Auth]:{
    screen:Auth,
    headerMode:'screen',
    navigationOptions:{
      header:null
    }
  },
  [screens.OnBoarding]: {
    screen: OnBoarding,
    headerMode: 'screen',
  },
  [screens.DrawerRoot]: {
    screen: NavigatorDrawer,
    headerMode: 'screen',
    navigationOptions: {
      header: null,
    },
  },
};

export default StackNavigator(routes);
