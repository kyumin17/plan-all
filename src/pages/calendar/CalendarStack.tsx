import CalendarPage from './CalendarPage';
import CalendarCreatePage from './CalendarCreatePage';
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
    </Stack.Navigator>
  );
}

export default CalendarStack;