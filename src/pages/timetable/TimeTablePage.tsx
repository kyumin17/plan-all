import TimeTable from '../../components/timetable/TimeTable';
import { View, ScrollView } from 'react-native';
import TimeTableHeader from '../../components/timetable/TimeTableHeader';
import CreateButton from '../../components/create_form/button/CreateButton';
import styled from 'styled-components/native';

const Title = styled.Text`
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  margin-top: 30px;
`;

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