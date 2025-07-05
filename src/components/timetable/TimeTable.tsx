import { StyleSheet, View, Text } from 'react-native';
import { TimeblockProps } from '../../types/types';
import { useState, useEffect } from 'react';
import { useDB } from '../common/DBProvider';
import selectDB from '../../utils/db/selectDB';
import TimeTableRow from './TimeTableRow';

const TimeTable = (
  { setTimeblock }: 
  { setTimeblock: React.Dispatch<React.SetStateAction<null | TimeblockProps>>}
) => {
  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  
  const [startTime, setStartTime] = useState<number>(10);
  const [endTime, setEndTime] = useState<number>(18);

  const timeList: number[] = Array.from({ length: endTime - startTime }, (_, i) => (i + startTime));
  
  const [timeblockList, setTimeblockList] = useState<TimeblockProps[]>([]);

  const db = useDB();

  const setTimeRange = (timeblockList: TimeblockProps[]) => {
    const newStartTime = Math.min(...timeblockList.map(block => block.start_hour));
    const newEndTime = Math.max(...timeblockList.map(block => block.end_hour));
    
    setStartTime(Math.min(startTime, newStartTime));
    setEndTime(Math.max(endTime, newEndTime + 1));
  }

  useEffect(() => {
    selectDB<null>({
        db: db,
        tableName: 'timetable',
        filter: {
          orderFilter: ['day', 'start_hour', 'start_minute'],
        },
      }).then((res) => {
        if (res) {
          setTimeblockList(res);
          setTimeRange(res);
        }
      });
  }, [db]);

  return (
    <View style={styles.table}>
      {/* time column */}
      <View style={styles.time_col}>
        <View style={{height: 25}}></View>
        {timeList.map((time: number) => {
          return (
            <Text key={time} style={styles.time_cell}>{time}</Text>
          );
        })}
      </View>

      <View style={{flex: 1}}>
        {/* timetable header (day) */}
        <View style={styles.th}>
          {dayNameList.map((day: string) => {
            return <Text style={styles.th_cell} key={day}>{day}</Text>;
          })}
        </View>

        {/* timetable body */}
        <View style={styles.body}>
          {dayNameList.map((day: string, idx: number) => {
            const dayblockList: TimeblockProps[] = timeblockList.filter((block) => block.day === idx);

            return (
              <TimeTableRow 
                key={day}
                dayblockList={dayblockList} 
                startTime={startTime} 
                setTimeblock={setTimeblock} 
                timeList={timeList} 
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    display: 'flex',
    flexDirection: 'row',
  },
  time_col: {
    width: '7%',
  },
  time_cell: {
    height: 85,
    boxSizing: 'border-box',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    borderRightColor: '#EFEFEF',
    textAlign: 'right',
    paddingRight: 6,
    paddingTop: 3,
    color: '#767676',
  },
  th: {
    height: 25,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  th_cell: {
    flex: 1,
    textAlign: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'row'
  },
});

export default TimeTable;