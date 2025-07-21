import CalendarPage from './CalendarPage';
import CalendarCreatePage from './CalendarCreatePage';
import CalendarEditPage from './CalendarEditPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='CalendarPage'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='CalendarPage' component={CalendarPage} />
      <Stack.Screen name='CalendarCreatePage' component={CalendarCreatePage} />
      <Stack.Screen name='CalendarEditPage' component={CalendarEditPage} />
    </Stack.Navigator>
  );
}

export default CalendarStack;