import TimeTable from '../../components/timetable/TimeTable';
import { View } from 'react-native';
import TimeTableHeader from '../../components/timetable/TimeTableHeader';
import CreateButton from '../../components/create_form/button/CreateButton';
import { useEffect, useState } from 'react';
import { TimetableDTO } from '../../types/types';
import { useDB } from '../../components/common/DBProvider';
import selectDB from '../../utils/db/selectDB';

const TimeTablePage = () => {
  const [table, setTable] = useState<TimetableDTO | null>(null);
  const db = useDB();

  useEffect(() => {
    selectDB<{ is_default: 0 | 1 }>({
      db: db,
      tableName: 'tablegroup',
      filter: {
        findFilter: { is_default: 1 },
        orderFilter: []
      }
    }).then((res) => {
      if (res) setTable(res[0]);
    });
  }, [db]);

  return (
    <View style={{flex: 1}}>
      {table && <View 
        style={{ flex: 1 }}
      >
        <TimeTableHeader 
          table={table}
        />
        <TimeTable 
          table={table}
        />
      </View>}
      
      <CreateButton 
        link='TimeTableCreatePage' 
        params={{ table: table }}
      />
    </View>
  );
};

export default TimeTablePage;