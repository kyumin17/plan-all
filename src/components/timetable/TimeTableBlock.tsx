import { View, Text, StyleSheet } from 'react-native';
import { TimeblockProps } from '../../types/types';

const TimeTableBlock = ({ timeblock }: { timeblock: TimeblockProps }) => {
  const getTimeSum = (hour: number, minute: number) => {
    return hour * 60 + minute;
  };

  const startSum = getTimeSum(timeblock.end_hour, timeblock.end_minute);
  const height = 85 * (startSum - getTimeSum(timeblock.start_hour, timeblock.start_minute)) / 60;
  const top = 85 * startSum / 60;

  return (
    <View style={[styles.block, {backgroundColor: timeblock.color, height: height, top: top}]}>
      <Text style={styles.name}>
        {timeblock.name}
      </Text>
      <Text style={styles.location}>
        {timeblock.location}
      </Text>
    </View>
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