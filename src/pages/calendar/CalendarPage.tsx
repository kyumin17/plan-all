import { useState, useEffect } from 'react';
import { CalendarProps } from '../../types/types';
import CalendarHeader from '../../components/calendar/CalendarHeader';
import CalendarBody from '../../components/calendar/CalendarBody';
import { View } from 'react-native';
import CreateButton from '../../components/create_form/CreateButton';
import { useDB } from '../../components/common/DBProvider';
import execDB from '../../utils/db/execDB';
import selectDB from '../../utils/db/selectDB';

interface FindFilter {
  start_year: number;
  start_month: number;
}

const CalendarPage = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth() % 12 + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [eventList, setEventList] = useState<CalendarProps[]>([]);

  const db = useDB();

  useEffect(() => {
    selectDB<FindFilter>({
      db: db,
      tableName: 'calendar',
      filter: {
        findFilter: { start_year: year, start_month: month },
        orderFilter: ['start_date'],
      },
    }).then((res) => {
      if (res) setEventList(res);
    });
  }, [db, year, month]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <CalendarHeader year={year} setYear={setYear} month={month} setMonth={setMonth} />
        <CalendarBody year={year} month={month} eventList={eventList} />
      </View>
      <CreateButton link='CalendarCreatePage' />
    </View>
  );
};

export default CalendarPage;