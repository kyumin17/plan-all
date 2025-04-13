import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import SchedulePage from "../pages/SchedulePage";
import TimeTablePage from "../pages/TimeTablePage";
import CalendarPage from "../pages/CalendarPage";
import SettingPage from "../pages/SettingPage";

const NavigationBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName='Schedule'>
      <Tab.Screen name='Schedule' component={SchedulePage} />
      <Tab.Screen name='TimeTable' component={TimeTablePage} />
      <Tab.Screen name='Calendar' component={CalendarPage} />
      <Tab.Screen name='Setting' component={SettingPage} />
    </Tab.Navigator>
  );
}

export default NavigationBar;