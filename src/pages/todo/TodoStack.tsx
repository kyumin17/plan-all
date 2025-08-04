import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoPage from './TodoPage';
import TodoCreatePage from './TodoCreatePage';

const Stack = createNativeStackNavigator();

const TodoStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='TodoPage'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='TodoPage' component={TodoPage} />
      <Stack.Screen name='TodoCreatePage' component={TodoCreatePage} />
    </Stack.Navigator>
  );
}

export default TodoStack;