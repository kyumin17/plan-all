import TimeTable from '../../components/timetable/TimeTable';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CreateButton from '../../components/create_form/CreateButton';

const TimeTablePage = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: useBottomTabBarHeight() }}
        style={{flex: 1}}
      >
        <Text style={styles.title}>
          시간표
        </Text>
        <TimeTable />
      </ScrollView>
      <CreateButton link='TimeTableCreatePage' />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default TimeTablePage;