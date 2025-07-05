import { useEffect, useState } from 'react';
import { useDB } from '../common/DBProvider';
import { ScheduleProps } from '../../types/types';
import { View, StyleSheet, Text } from 'react-native';
import selectSchedule from '../../utils/selectSchedule';
import ScheduleBlock from './ScheduleBlock';

const ScheduleBody = (
  { year, month, date }: 
  { 
    year: number; 
    month: number; 
    date: number;
  }
) => {
  const db = useDB();

  const day = (new Date(year, month - 1, date).getDay() + 6) % 7;

  const [scheduleList, setScheduleList] = useState<ScheduleProps[]>([]);

  const [startTime, setStartTime] = useState<number>(12);
  const [endTime, setEndTime] = useState<number>(18);

  const timeList: number[] = Array.from({ length: endTime - startTime }, (_, i) => (i + startTime));

  const setTimeRange = (scheduleList: ScheduleProps[]) => {
    const newStartTime = Math.min(...scheduleList.map(block => block.start_hour ?? 24));
    const newEndTime = Math.max(...scheduleList.map(block => block.end_hour ?? 0));
    
    setStartTime(Math.min(startTime, newStartTime));
    setEndTime(Math.max(endTime, newEndTime + 1));
  }

  useEffect(() => {
    selectSchedule({
      db: db,
      year: year,
      month: month,
      date: date,
    }).then((res) => {
      if (res) {
        setScheduleList(res);
        setTimeRange(res);
      }
    })
  }, [db, year, month, date, day]);

  return (
    <View style={styles.body}>
      {/* time column */}
      <View style={styles.time_col}>
        {timeList.map((time: number) => {
          return (
            <Text key={time} style={styles.time_cell}>{time}</Text>
          );
        })}
      </View>

      <View style={styles.row}>
        {scheduleList.map((schedule: ScheduleProps) => {
          return (
            <ScheduleBlock 
              key={schedule.id} 
              schedule={schedule}
              startTime={startTime}
            />
          );
        })}
        
        {timeList.map((time: number) => {
          return <View key={time} style={styles.cell}></View>;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  time_col: {
    width: '7%',
  },
  time_cell: {
    height: 70,
    boxSizing: 'border-box',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    borderRightColor: '#EFEFEF',
    textAlign: 'right',
    paddingRight: 6,
    paddingTop: 3,
    color: '#767676',
  },
  row: {
    position: 'relative',
    flex: 1,
  },
  cell: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
});

export default ScheduleBody;