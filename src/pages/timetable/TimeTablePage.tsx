import TimeTable from '../../components/timetable/TimeTable';
import { View, ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CreateButton from '../../components/create_form/CreateButton';

const TimeTablePage = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: useBottomTabBarHeight() }}
        style={{flex: 1}}
      >
        <View style={{height: '5%'}}></View>
        <TimeTable />
      </ScrollView>
      <CreateButton link='TimeTableCreatePage' />
    </View>
  );
};

export default TimeTablePage;