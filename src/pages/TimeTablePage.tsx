import TimeTable from '../components/timetable/TimeTable';
import { View, ScrollView, Text } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const TimeTablePage = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: useBottomTabBarHeight() }}>
      <View style={{height: '5%'}}></View>
      <TimeTable />
    </ScrollView>
  );
};

export default TimeTablePage;