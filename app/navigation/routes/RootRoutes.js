import screens from '../../constants/screens';
import {
  AccountsNavigator,
  CategoriesNavigator,
  SettingsNavigator,
  TransactionsNavigator,
  TrendsNavigator,
  FavouritesNavigator,
  TodoNavigator
} from '../navigators';

const Routes = {
  [screens.TransactionsRoot]: {
    screen: TransactionsNavigator,
  },
  [screens.TodoRoot]:{
    screen:TodoNavigator,
  },
  [screens.AccountsRoot]: {
    screen: AccountsNavigator,
  },
  [screens.CategoriesRoot]: {
    screen: CategoriesNavigator,
  },
  [screens.TrendsRoot]: {
    screen: TrendsNavigator,
  },
  [screens.FavouritesRoot]: {
    screen: FavouritesNavigator,
  },
  [screens.SettingsRoot]: {
    screen: SettingsNavigator,
  },
};

export default Routes;
