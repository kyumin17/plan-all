import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleStack from '../pages/schedule/ScheduleStack';
import TimeTableStack from '../pages/timetable/TimeTableStack';
import SettingPage from '../pages/SettingPage';
import CalendarSvg from '../assets/image/calendar.svg';
import ClockSvg from '../assets/image/clock.svg';
import TableSvg from '../assets/image/table.svg';
import ToolSvg from '../assets/image/tool.svg';
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
        component={ScheduleStack} 
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
        name='설정' 
        component={SettingPage} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <ToolSvg stroke={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default NavigationBar;