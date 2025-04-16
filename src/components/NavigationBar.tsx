import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import SchedulePage from "../pages/SchedulePage";
import TimeTablePage from "../pages/TimeTablePage";
import CalendarPage from "../pages/CalendarPage";
import SettingPage from "../pages/SettingPage";

const NavigationBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName='일정'>
      <Tab.Screen 
        name='일정' 
        component={SchedulePage} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name='시간표' 
        component={TimeTablePage} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name='달력' 
        component={CalendarPage} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name='설정' 
        component={SettingPage} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  
});

export default NavigationBar;