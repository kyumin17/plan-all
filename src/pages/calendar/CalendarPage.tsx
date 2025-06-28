import { useState, useEffect } from 'react';
import { CalendarProps } from '../../types/types';
import CalendarHeader from '../../components/calendar/CalendarHeader';
import CalendarBody from '../../components/calendar/CalendarBody';
import { View } from 'react-native';
import CreateButton from '../../components/create_form/CreateButton';
import useFetch from '../../hooks/useFetch';
import { calendarCreateCommand } from '../../assets/data/db_creation';

const CalendarPage = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth() % 12 + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [eventList, setEventList] = useState<CalendarProps[]>([]);

  const { result, error } = useFetch(
    { 
      createCommand: calendarCreateCommand, 
      dbName: 'calendar',
      filter: 'start_month = ?',
      params: [month],
    }
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }

    if (result) {
      const events = [];
      for (let i = 0; i < result.rows.length; i++) {
        events.push(result.rows.item(i));
      }
      setEventList(events);
    }
  }, [result, error]);

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