import TimeTable from '../../components/timetable/TimeTable';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CreateButton from '../../components/create_form/CreateButton';
import TimeTableModal from '../../components/timetable/TimeTableModal';
import { useState } from 'react';
import { TimeblockProps } from '../../types/types';

const TimeTablePage = ({ navigation }: { navigation: any }) => {
  const [timeblock, setTimeblock] = useState<null | TimeblockProps>(null);

  return (
    <View style={{flex: 1}}>
      <ScrollView 
        style={{flex: 1}}
      >
        <Text style={styles.title}>
          시간표
        </Text>
        <TimeTable setTimeblock={setTimeblock} />
      </ScrollView>
      <CreateButton link='TimeTableCreatePage' />
      {timeblock &&
      <TimeTableModal timeblock={timeblock} setTimeblock={setTimeblock} navigation={navigation} />}
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