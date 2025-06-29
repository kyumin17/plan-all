import { StyleSheet, View, Text } from 'react-native';
import { TimeblockProps } from '../../types/types';
import TimeTableBlock from './TimeTableBlock';
import useDB from '../../hooks/useDB';
import { timetableCreateCommand } from '../../assets/data/db_creation';
import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const TimeTable = () => {
  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const timeList: number[] = Array.from({ length: 12 }, (_, i) => (i + 7) % 12 + 1);
  
  const [timeblockList, setTimeblockList] = useState<TimeblockProps[]>([]);
  const { result, error } = useFetch(
    { 
      createCommand: timetableCreateCommand, 
      tableName: 'timetable',
      filter: null,
      params: [],
    }
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }

    if (result) {
      const timetables: TimeblockProps[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        timetables.push(result.rows.item(i));
      }
      setTimeblockList(timetables);
    }
  }, [result, error]);

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
            const dayblockList = timeblockList.filter((block) => block.day === idx);
            
            return (
              <View key={day} style={styles.row}>
                {dayblockList.map((block) => {
                  return <TimeTableBlock key={block.id} timeblock={block} />
                })}
                {timeList.map((time: number) => {
                  return <Text key={time} style={styles.cell}></Text>;
                })}
              </View>
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
  row: {
    position: 'relative',
    flex: 1,
  },
  cell: {
    height: 85,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
});

export default TimeTable;