import { useState, useEffect } from 'react';
import { CalendarProps } from '../types/types';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarBody from '../components/calendar/CalendarBody';
import { View } from 'react-native';

const CalendarPage = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth() % 12 + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [eventList, setEventList] = useState<CalendarProps[]>([]);

  useEffect(() => {
    const data: CalendarProps[] = [
      {id: 1, start_date: {time: {hour: 1, minute: 0}, year: 2025, month: 4, date: 30}, end_date: {time: {hour: 3, minute: 0}, year: 2025, month: 4, date: 30}, location: 'D102', name: 'ㅎㅇ', color: 'blue'},
      {id: 2, start_date: {time: {hour: 17, minute: 30}, year: 2025, month: 4, date: 15}, end_date: {time: {hour: 18, minute: 30}, year: 2025, month: 4, date: 15}, name: '시험기간', color: 'green'}
    ]; // test data
    setEventList(data);
  }, [month, year]);

  return (
    <View>
      <CalendarHeader year={year} setYear={setYear} month={month} setMonth={setMonth} />
      <CalendarBody year={year} month={month} eventList={eventList} />
    </View>
  );
};

export default CalendarPage;