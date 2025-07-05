import { ScrollView } from 'react-native';
import { useState } from 'react';
import ScheduleBody from '../../components/schedule/ScheduleBody';
import ScheduleHeader from '../../components/schedule/ScheduleHeader';

const SchedulePage = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [date, setDate] = useState<number>(new Date().getDate());

  return (
    <ScrollView 
      style={{flex: 1}}
    >
      <ScheduleHeader 
        year={year} 
        month={month} 
        date={date}
      />
      <ScheduleBody 
        year={year} 
        month={month} 
        date={date}
      />
    </ScrollView>
  );
};

export default SchedulePage;