import TimeTable from '../../components/timetable/TimeTable';
import { View, ScrollView } from 'react-native';
import TimeTableHeader from '../../components/timetable/TimeTableHeader';
import CreateButton from '../../components/create_form/button/CreateButton';
import styled from 'styled-components/native';

const TimeTablePage = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView 
        style={{flex: 1}}
      >
        <TimeTableHeader />
        <TimeTable />
      </ScrollView>
      <CreateButton link='TimeTableCreatePage' />
    </View>
  );
};

export default TimeTablePage;