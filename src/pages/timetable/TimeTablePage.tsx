import TimeTable from '../../components/timetable/TimeTable';
import { View, ScrollView, Button } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

const TimeTablePage = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: useBottomTabBarHeight() }}>
      <View style={{height: '5%'}}></View>
      <TimeTable />
      <Button title='Create TimeBlock' onPress={() => navigation.navigate('TimeTableCreatePage')} />
    </ScrollView>
  );
};

export default TimeTablePage;