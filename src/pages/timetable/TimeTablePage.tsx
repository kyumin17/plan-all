import TimeTable from '../../components/timetable/TimeTable';
import { View, ScrollView } from 'react-native';
import TimeTableHeader from '../../components/timetable/TimeTableHeader';
import CreateButton from '../../components/create_form/button/CreateButton';
import { useState } from 'react';
import { TimetableDTO } from '../../types/types';

const TimeTablePage = () => {
  const [table, setTable] = useState<TimetableDTO | null>(null);

  return (
    <View style={{flex: 1}}>
      <ScrollView 
        style={{flex: 1}}
      >
        <TimeTableHeader />
        {table && <TimeTable 
          table={table}
        />}
      </ScrollView>
      
      <CreateButton 
        link='TimeTableCreatePage' 
        params={{ table: table }}
      />
    </View>
  );
};

export default TimeTablePage;