import SchedulePage from './SchedulePage';
import ScheduleCreatePage from './ScheduleCreatePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ScheduleStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='SchedulePage'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='SchedulePage' component={SchedulePage} />
      <Stack.Screen name='ScheduleCreatePage' component={ScheduleCreatePage} />
    </Stack.Navigator>
  );
}

export default ScheduleStack;