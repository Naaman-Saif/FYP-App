import { StackNavigator } from 'react-navigation';
import TodoRoutes from '../routes/TodoRoutes';
import navOptions from '../../utils/navOptions';

const TodoNavigator = StackNavigator(TodoRoutes, {
  ...navOptions({
    title: 'Reminder',
    icon: 'wallet',
  }),
});

export default TodoNavigator;
