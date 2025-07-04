import { Text, StyleSheet, Pressable } from 'react-native';
import { TimeblockProps } from '../../types/types';

const TimeTableBlock = (
  { timeblock, startTime, setTimeblock }: 
  { 
    timeblock: TimeblockProps,
    startTime: number,
    setTimeblock: React.Dispatch<React.SetStateAction<null | TimeblockProps>>
  }
) => {
  const getTimeSum = (hour: number, minute: number) => {
    return hour * 60 + minute;
  };

  const startSum = getTimeSum(timeblock.start_hour, timeblock.start_minute);
  const endSum = getTimeSum(timeblock.end_hour, timeblock.end_minute);
  const height = 85 * (endSum - startSum) / 60;
  const top = 85 * (startSum - startTime * 60) / 60;

  return (
    <Pressable 
      style={[styles.block, {backgroundColor: timeblock.color, height: height, top: top}]}
      onPress={() => setTimeblock(timeblock)}
    >
      <Text style={styles.name}>
        {timeblock.name}
      </Text>
      <Text style={styles.location}>
        {timeblock.location}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    boxSizing: 'border-box',
    position: 'absolute',
    padding: 4,
    left: 0,
    width: '100%',
    zIndex: 1,
    borderColor: 'white',
    borderWidth: 0.5,
  },
  name: {
    color: 'white',
    fontWeight: 500,
    fontSize: 12,
  },
  location: {
    fontSize: 12,
    color: '#ECECEC',
    fontWeight: 500,
  },
});

export default TimeTableBlock;