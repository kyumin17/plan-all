import { View, StyleSheet } from 'react-native';
import TimeTableBlock from './TimeTableBlock';
import { TimeblockProps } from '../../types/types';

const TimeTableRow = (
  { dayblockList, startTime, setTimeblock, timeList }:
  {
    dayblockList: TimeblockProps[],
    startTime: number,
    setTimeblock: React.Dispatch<React.SetStateAction<null | TimeblockProps>>,
    timeList: number[]
  }
) => {
  return (
    <View style={styles.row}>
      {dayblockList.map((block) => {
        return (
          <TimeTableBlock 
            key={block.id} 
            timeblock={block} 
            startTime={startTime} 
            setTimeblock={setTimeblock}
          />
        );
      })}
      
      {timeList.map((time: number) => {
        return <View key={time} style={styles.cell}></View>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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

export default TimeTableRow;