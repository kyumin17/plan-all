import { useEffect, useState } from 'react';
import { TimeblockDTO, TimetableDTO, TimetableItemProps } from '../../types/types';
import { useDB } from '../../components/common/DBProvider';
import selectDB from '../../utils/db/selectDB';
import TimeTableItem from '../../components/timetable/TimeTableItem';
import Carousel from '../../components/common/Carousel';
import { View } from 'react-native';
import CreateButton from '../../components/create_form/button/CreateButton';

const TimeTablePage = () => {
  const [tableList, setTableList] = useState<TimetableDTO[]>([]);
  const [eventList, setEventList] = useState<TimeblockDTO[]>([]);
  const data: TimetableItemProps[] = tableList.map((item) => {
    return {
      table: item,
      events: eventList.filter((event) => event.table_id === item.id)
    };
  });

  const db = useDB();

  useEffect(() => {
    selectDB<null>({
      db: db,
      tableName: 'tablegroup',
      filter: {
        orderFilter: ['is_default']
      }
    }).then((res) => {
      if (res) setTableList(res);
    });

    selectDB<null>({
      db: db,
      tableName: 'timetable',
      filter: {

      }
    }).then((res) => {
      if (res) setEventList(res);
    });
  }, [db]);

  return (
    <View>
      <Carousel
        data={data}
        startIndex={tableList.length - 1}
        renderItem={TimeTableItem}
      />
      <CreateButton 
        link='TimeTableCreatePage' 
        params={{ table: tableList[0] }}
      />
    </View>
  )
};

export default TimeTablePage;