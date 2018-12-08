import screens from '../../constants/screens';
import { Todo, Favourites, CategoryEditor, TransactionDetail, TransferDetail } from '../../screens';
import headerOptions from '../../utils/stackHeaderOptions';

const Routes = {
  [screens.Todo]: {
    screen: Todo,
    navigationOptions: headerOptions({ title: 'Reminder' }),
  },
  [screens.CategoryEditor]: {
    screen: CategoryEditor,
  },
  [screens.TransactionDetail]: {
    screen: TransactionDetail,
  },
  [screens.TransferDetail]: {
    screen: TransferDetail,
  },
};

export default Routes;
