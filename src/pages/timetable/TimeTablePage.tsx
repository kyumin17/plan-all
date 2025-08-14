import TimeTable from '../../components/timetable/TimeTable';
import { View, ScrollView } from 'react-native';
import TimeTableHeader from '../../components/timetable/TimeTableHeader';
import CreateButton from '../../components/create_form/button/CreateButton';
import { useState } from 'react';
import { TimetableDTO } from '../../types/types';

const TimeTablePage = () => {
  const [table, setTable] = useState<TimetableDTO | null>({ id: 1, name: '시간표' });

  return (
    <View style={{flex: 1}}>
      {table && <ScrollView 
        style={{flex: 1}}
      >
        <TimeTableHeader 
          table={table}
        />
        <TimeTable 
          table={table}
        />
      </ScrollView>}
      
      <CreateButton 
        link='TimeTableCreatePage' 
        params={{ table: table }}
      />
    </View>
  );
};

export default TimeTablePage;