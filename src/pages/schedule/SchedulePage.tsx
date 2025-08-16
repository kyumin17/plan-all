import { View } from 'react-native';
import { useState, useEffect } from 'react';
import ScheduleBody from '../../components/schedule/ScheduleBody';
import ScheduleHeader from '../../components/schedule/ScheduleHeader';
import ScheduleAllday from '../../components/schedule/ScheduleAllday';
import { useDB } from '../../components/common/DBProvider';
import selectSchedule from '../../utils/selectSchedule';
import { ScheduleDTO } from '../../types/types';

const SchedulePage = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [date, setDate] = useState<number>(new Date().getDate());

  const [eventList, setEventList] = useState<ScheduleDTO[]>([]);

  const db = useDB();

  useEffect(() => {
    selectSchedule({
      db: db,
      year: year,
      month: month,
      date: date,
    }).then((res) => {
      if (res) setEventList(res);
    })
  }, [db, year, month, date]);

  return (
    <View 
      style={{flex: 1}}
    >
      <ScheduleHeader 
        year={year} 
        month={month} 
        date={date}
      />
      <ScheduleAllday
        eventList={eventList.filter((event) => event.all_day === 1)}
        month={month}
        date={date}
      />
      <ScheduleBody 
        eventList={eventList.filter((event) => event.all_day === 0)}
      />
    </View>
  );
};

export default SchedulePage;