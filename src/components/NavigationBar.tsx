import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SchedulePage from '../pages/schedule/SchedulePage';
import TimeTableStack from '../pages/timetable/TimeTableStack';
import TodoPage from '../pages/todo/TodoPage';
import CalendarSvg from '../assets/image/calendar.svg';
import ClockSvg from '../assets/image/clock.svg';
import TableSvg from '../assets/image/table.svg';
import TodoSvg from '../assets/image/todo.svg';
import CalendarStack from '../pages/calendar/CalendarStack';

const NavigationBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator 
      initialRouteName='일정'
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          paddingTop: 7,
        },
      }}
    >
      <Tab.Screen 
        name='일정' 
        component={SchedulePage} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TableSvg stroke={color} />
          ),
        }}
      />
      <Tab.Screen 
        name='시간표' 
        component={TimeTableStack} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <ClockSvg stroke={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name='달력' 
        component={CalendarStack} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CalendarSvg stroke={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name='할 일' 
        component={TodoPage} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TodoSvg stroke={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default NavigationBar;