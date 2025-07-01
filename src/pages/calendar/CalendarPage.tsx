import { useState, useEffect } from 'react';
import { CalendarProps } from '../../types/types';
import CalendarHeader from '../../components/calendar/CalendarHeader';
import CalendarBody from '../../components/calendar/CalendarBody';
import { View } from 'react-native';
import CreateButton from '../../components/create_form/CreateButton';
import { useDB } from '../../components/common/DBProvider';
import execDB from '../../utils/db/execDB';
import { calendarCreateCommand } from '../../assets/data/db_creation';
import SQLite from 'react-native-sqlite-storage';

const CalendarPage = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth() % 12 + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [eventList, setEventList] = useState<CalendarProps[]>([]);

  const db = useDB();

  useEffect(() => {
    if (!db) return;

    const fetchEvents = async () => {
      try {
        const { data, error } = await execDB({
          db,
          query: 'SELECT * FROM calendar WHERE start_month = ?',
          params: [month],
        });

        if (error) {
          console.error('Error fetching events:', error);
          return;
        }

        if (!data) return;

        const events = [];
        for (let i = 0; i < data.rows.length; i++) {
          events.push(data.rows.item(i));
        }
        setEventList(events);
      } catch (err) {
        console.error('Error executing query:', err);
      }
    };

    fetchEvents();
  }, [month]);

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