import TimeTable from '../../components/timetable/TimeTable';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
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
        <Title>
          시간표
        </Title>
        <TimeTable />
      </ScrollView>
      <CreateButton link='TimeTableCreatePage' />
    </View>
  );
};

export default TimeTablePage;