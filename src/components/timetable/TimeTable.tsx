import { StyleSheet, View, Text } from 'react-native';
import { TimeblockProps } from '../../types/types';
import TimeTableBlock from './TimeTableBlock';

const TimeTable = () => {
  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const timeList: number[] = Array.from({ length: 12 }, (_, i) => (i + 7) % 12 + 1);

  const timeblockList: TimeblockProps[] = [
    {id: '1', day: 0, start_at: {hour: 1, minute: 2}, end_at: {hour: 2, minute: 1}, location: 'D102', name: 'HELLO', color: '#53BF57'},
    {id: '2', day: 2, start_at: {hour: 4, minute: 0}, end_at: {hour: 6, minute: 30}, location: 'D102', name: '컴프 시험', color: '#3AAAFF'}
  ]; // test data

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
              <View key={day} style={[styles.row, {backgroundColor: idx % 2 === 0 ? 'white' : '#FCFCFC'}]}>
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
    borderRightWidth: 1,
    borderTopColor: '#D8D8D8',
    borderRightColor: '#D8D8D8',
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
    borderTopColor: '#D8D8D8',
  },
});

export default TimeTable;